import type { APIGatewayProxyResult } from 'aws-lambda'
import { getCompanyFromDocument } from '../../utils'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../utils/apiGateway.util'
import { updateCompanyById } from '../../utils/db/company/updateById'
import { middyfy } from '../../utils/lambda.util'
import type { Company } from '../../utils/sharedUtils/interfaces'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, null> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const companyId = event.requestContext?.authorizer?.principalId
  const { name } = event.body
  const companyDocument = await updateCompanyById(companyId, { name })
  const response: Company = getCompanyFromDocument(companyDocument)
  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
