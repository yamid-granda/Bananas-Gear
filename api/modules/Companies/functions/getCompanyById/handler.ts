import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import type { Company } from '../../../../utils'
import { getCompanyFromDocument } from '../../../../utils/functions/Company/getCompanyFromDocument'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../../../utils/apiGateway.util'
import { getCompanyById } from '../../../../utils/db/company/getCompanyById.db'
import { middyfy } from '../../../../utils/lambda.util'

interface PathParameters {
  companyId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<null, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId } = event.pathParameters
  const companyDocument = await getCompanyById(companyId)

  if (!companyDocument)
    throw new BadRequestError('company not exist')

  const company: Company = getCompanyFromDocument(companyDocument)

  return {
    statusCode: 200,
    body: JSON.stringify(company),
  }
}

export const main = middyfy(handler)
