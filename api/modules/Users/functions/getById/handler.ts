import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import type {
  User,
  ValidatedEventAPIGatewayProxyEvent,
} from '../../../../utils'
import { middyfy } from '../../../../utils/lambda.util'
import { getUserFromDoc } from '../../utils/getUserFromDoc'
import { getUserById } from '@/api/utils/db/users/getUserById'

interface PathParameters {
  userId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<null, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { userId: id } = event.pathParameters

  const {
    isSuccess: existUser,
    result: userDoc,
  } = await getUserById(id)

  if (!existUser)
    throw new BadRequestError(`user with id ${id} is not registered`)

  const response: User = getUserFromDoc(userDoc)

  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  }
}

export const main = middyfy(handler)
