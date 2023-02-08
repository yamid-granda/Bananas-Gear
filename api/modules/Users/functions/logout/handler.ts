import type { APIGatewayProxyResult } from 'aws-lambda'
import { UnauthorizedError } from 'http-errors-enhanced'
import { updateUserById } from '../../../../utils/db/users/updateById'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../../../utils/apiGateway.util'
import { middyfy } from '../../../../utils/lambda.util'
import type { UserLogoutRes } from './types'

interface PathParameters {
  userId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<null, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { userId } = event.pathParameters
  const updateRes = await updateUserById(userId, {
    salt: null,
    secretKey: null,
  })

  if (!updateRes.isSuccess)
    throw new UnauthorizedError('user not found')

  const response: UserLogoutRes = {
    isSuccess: true,
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ response }),
  }
}

export const main = middyfy(handler)
