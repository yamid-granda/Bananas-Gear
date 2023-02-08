import type { APIGatewayProxyResult } from 'aws-lambda'
import { hashSync } from 'bcryptjs'
import { BadRequestError } from 'http-errors-enhanced'
import { UsersConfig } from '../../config'
import type { userCreatorSchema } from './schema'
import {
  generateKey,
  getCompanyUserByEmail,
} from '@/api/utils'
import type {
  User,
  UserDocCreateReq,
  ValidatedEventAPIGatewayProxyEvent,
} from '@/api/utils'
import { getTotalTableDocuments } from '@/api/utils/db/counts'
import { addCompanyUser } from '@/api/utils/db/company/addCompanyUser.db'
import { middyfy } from '@/api/utils/lambda.util'

interface PathParameters {
  companyId: string
}

const usersTableName = `${process.env.USERS_TABLE_NAME}`

const handler: ValidatedEventAPIGatewayProxyEvent<typeof userCreatorSchema, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId } = event.pathParameters
  const { email, password, name } = event.body
  const { isSuccess: existUserEmailInCompany } = await getCompanyUserByEmail(companyId, email)

  if (existUserEmailInCompany)
    throw new BadRequestError('the user email has already been added to this company')

  const usersCount = await getTotalTableDocuments({
    tableName: usersTableName,
    countsTableSuffix: companyId,
  })

  const { MAX_QUANTITY_BY_COMPANY } = UsersConfig

  if (usersCount >= MAX_QUANTITY_BY_COMPANY)
    throw new BadRequestError(`the company has reached the maximum number of users, ${MAX_QUANTITY_BY_COMPANY} is the max allowed number of users`)

  const userDocCreateReq: UserDocCreateReq = {
    companyId,
    email,
    name,
    password: hashSync(password),
    salt: generateKey(),
    secretKey: generateKey(),
  }

  const user = await addCompanyUser(userDocCreateReq)

  const response: User = {
    id: user.id,
    createdAt: user.createdAt,
    email: user.email,
    name: user.name,
    status: user.status,
    companyId: user.companyId,
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
