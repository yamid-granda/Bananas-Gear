import type { APIGatewayProxyResult } from 'aws-lambda'
import { compareSync } from 'bcryptjs'
import { BadRequestError } from 'http-errors-enhanced'
import { sign } from 'jsonwebtoken'
import type { Company } from '../../../utils'
import { getCompanyFromDocument } from '../../../utils'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../../utils/apiGateway.util'
import { getCompanyByEmail } from '../../../utils/db/company/getCompanyByEmail.db'
import { updateCompanyById } from '../../../utils/db/company/updateById'
import { generateKey } from '../../../utils/generateKey.util'
import { middyfy } from '../../../utils/lambda.util'
import { ONE_DAY_IN_SECONDS, parseSecondsToDays } from '../../../utils/date/parseMillisecondsToDays'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, null> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { email, password } = event.body

  const companyDocument = await getCompanyByEmail(email)

  if (!companyDocument)
    throw new BadRequestError(`email ${email} is not registered, check your email address`)

  const passwordIsOk = compareSync(password, companyDocument.password)

  if (!passwordIsOk)
    throw new BadRequestError('password not match, check your password')

  const secretKey = generateKey()
  const salt = generateKey()

  await updateCompanyById(companyDocument.id, { secretKey, salt })

  const secretSalt = salt + process.env.JWT_SECRET
  const expiresIn = ONE_DAY_IN_SECONDS
  const expiresInClient = parseSecondsToDays(expiresIn)
  const token = sign({ secretKey }, secretSalt, { expiresIn })

  const company: Company = getCompanyFromDocument(companyDocument)
  const response = {
    token,
    expiresIn: expiresInClient,
    company,
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
