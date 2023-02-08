import type { APIGatewayProxyResult } from 'aws-lambda'
import { UnauthorizedError } from 'http-errors-enhanced'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../../utils/apiGateway.util'
import { middyfy } from '../../../utils/lambda.util'
import { updateCompanyById } from '../../../utils/db/company/updateById'

interface PathParameters {
  companyId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<null, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId } = event.pathParameters
  const document = await updateCompanyById(companyId, { salt: null, secretKey: null })

  if (!document)
    throw new UnauthorizedError('company not found')

  return {
    statusCode: 201,
    body: JSON.stringify({ success: true }),
  }
}

export const main = middyfy(handler)
