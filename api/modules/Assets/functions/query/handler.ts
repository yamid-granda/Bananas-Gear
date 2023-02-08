import type { APIGatewayProxyResult } from 'aws-lambda'
import type { Asset } from '../../types'
import { queryCompanyAssetsFromDb } from '../../db-services/queryCompanyAssetsFromDb'
import { getAssetFromDoc } from '../../utils'
import type { Pagination, ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import type { ApiRes } from '@/api/types'
import { parseQueryStringParams } from '@/api/utils/http/parseQueryStringParams'
import type { FlatQueryStringParameters } from '@/api/shared/http/interfaces'

interface PathParameters {
  companyId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<any, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId } = event.pathParameters
  const flatQueryStringParameters: FlatQueryStringParameters = event.queryStringParameters
  const queryStringParameters = parseQueryStringParams(flatQueryStringParameters)
  const queryResponse = await queryCompanyAssetsFromDb(companyId, { queryStringParameters })
  const { documents: assetDocs } = queryResponse

  const assets = assetDocs.map(getAssetFromDoc)

  const response = {
    ...queryResponse,
    documents: assets,
  }

  const res: ApiRes<Pagination<Partial<Asset>>> = { response }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}

export const main = middyfy(handler)
