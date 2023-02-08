import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError, InternalServerError } from 'http-errors-enhanced'
import type { UserDocument } from 'utils/sharedUtils/interfaces/user/userDocument.interface'
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
  const { isSuccess: userExist, result: userDoc } = await getUserById(userId)
  const isNotFoundUser = !userExist || userDoc.companyId !== companyId

  if (isNotFoundUser)
    throw new BadRequestError('user not found')

  const status: UserDocument['status'] = userDoc.invitationAcceptedAt ? 'active' : 'pending'

  const {
    isSuccess: isASuccessfulUpdate,
    result: updatedUserDoc,
  } = await updateUserById(userId, { status })

  if (!isASuccessfulUpdate)
    throw new InternalServerError('user update failed')

  const response: User = {
    id: updatedUserDoc.id,
    createdAt: updatedUserDoc.createdAt,
    companyId: updatedUserDoc.companyId,
    email: updatedUserDoc.email,
    name: updatedUserDoc.name,
    status: updatedUserDoc.status,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
