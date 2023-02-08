import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError, InternalServerError } from 'http-errors-enhanced'
import { hashSync } from 'bcryptjs'
import { getUserFromDoc } from '../../utils/getUserFromDoc'
import type { UserDocUpdater } from '../../types'
import type { userEditorSchema } from './schema'
import type { User, ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { generateKey } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import { getUserById } from '@/api/utils/db/users/getUserById'
import { updateUserById } from '@/api/utils/db/users/updateById'

interface PathParameters {
  userId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof userEditorSchema, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { userId } = event.pathParameters
  const { isSuccess: exists } = await getUserById(userId)

  if (exists)
    throw new BadRequestError('user not found')

  const { email, name, password } = event.body
  const userDocUpdater: UserDocUpdater = { name, email }

  if (password) {
    userDocUpdater.password = hashSync(password)
    userDocUpdater.salt = generateKey()
    userDocUpdater.secretKey = generateKey()
  }

  const {
    isSuccess: isUpdated,
    result: editedUserDoc,
  } = await updateUserById(userId, userDocUpdater)

  if (!isUpdated)
    throw new InternalServerError('update user failed')

  const response: User = getUserFromDoc(editedUserDoc)

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
