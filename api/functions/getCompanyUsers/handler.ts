import type { APIGatewayProxyResult } from 'aws-lambda'
import { middyfy } from '../../utils/lambda.util'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../utils/apiGateway.util'
import { getUsersByCompanyId } from '../../utils/db/users/getUsersByCompanyId'
import { parseQueryStringParams } from '@/api/utils/http/parseQueryStringParams'

interface PathParameters {
  companyId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<any, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId } = event.pathParameters
  const queryStringParameters = parseQueryStringParams(event?.queryStringParameters)
  const queryResponse = await getUsersByCompanyId(companyId, { queryStringParameters })

  const response = {
    ...queryResponse,
    documents: queryResponse.documents,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
