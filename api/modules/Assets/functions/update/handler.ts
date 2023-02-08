import type { APIGatewayProxyResult } from 'aws-lambda'
import { InternalServerError } from 'http-errors-enhanced'
import type { Asset, AssetUpdateReqDoc } from '../../types'
import { updateAssetInDb } from '../../db-services/updateAssetInDb'
import { getAssetFromDoc } from '../../utils'
import type { updateAssetSchema } from './schema'
import type { ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import type { ApiRes } from '@/api/types'

interface PathParameters {
  assetId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof updateAssetSchema, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { assetId } = event.pathParameters
  const { name } = event.body

  const updateReqDoc: AssetUpdateReqDoc = { name }
  const dbRes = await updateAssetInDb(assetId, updateReqDoc)

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
