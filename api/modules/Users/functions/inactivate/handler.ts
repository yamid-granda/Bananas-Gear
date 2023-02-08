import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError, InternalServerError } from 'http-errors-enhanced'
import type { User, ValidatedEventAPIGatewayProxyEvent } from '../../../../utils'
import { middyfy } from '../../../../utils/lambda.util'
import { getUserById } from '../../../../utils/db/users/getUserById'
import { updateUserById } from '../../../../utils/db/users/updateById'

interface PathParameters {
  companyId: string
  userId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<any, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId, userId } = event.pathParameters
  const { isSuccess: userExist, result: user } = await getUserById(userId)

  const isUserNotFound = !userExist || user.companyId !== companyId
  if (isUserNotFound)
    throw new BadRequestError('user not found')

  const { isSuccess: isSuccessfulUpdate, result: inactivatedUser } = await updateUserById(userId, {
    status: 'inactivated',
  })
  if (!isSuccessfulUpdate)
    throw new InternalServerError('update user failed')

  const response: User = {
    id: inactivatedUser.id,
    createdAt: inactivatedUser.createdAt,
    companyId: inactivatedUser.companyId,
    email: inactivatedUser.email,
    name: inactivatedUser.name,
    status: inactivatedUser.status,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
