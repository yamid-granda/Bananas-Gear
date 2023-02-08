import type { APIGatewayProxyResult } from 'aws-lambda'
import { InternalServerError } from 'http-errors-enhanced'
import type { Asset } from '../../types'
import { getAssetFromDoc } from '../../utils'
import { activateAssetInDb } from '../../db-services/activateAssetInDb'
import type { ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import type { ApiRes } from '@/api/types'

interface PathParameters {
  assetId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<null, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { assetId } = event.pathParameters
  const dbRes = await activateAssetInDb(assetId)

  if (!dbRes.isSuccess)
    throw new InternalServerError()

  const assetDoc = dbRes.result
  const asset = getAssetFromDoc(assetDoc)
  const res: ApiRes<Asset> = { response: asset }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}

export const main = middyfy(handler)
