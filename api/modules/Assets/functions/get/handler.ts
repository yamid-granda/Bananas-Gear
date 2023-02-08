import type { APIGatewayProxyResult } from 'aws-lambda'
import { InternalServerError } from 'http-errors-enhanced'
import { getAssetFromDoc, getAssetPartFromDoc } from '../../utils'
import { getAssetFromDb } from '../../db-services/getAssetFromDb'
import type { Asset, AssetDoc } from '../../types'
import { getAssetPartsFromDb } from '../../db-services/getAssetPartsFromDb'
import type { ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import type { ApiRes } from '@/api/types'
import type { DBResponse } from '@/api/utils/interfaces/db'

interface PathParameters {
  assetId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<any, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { assetId } = event.pathParameters

  const promises: [
    Promise<DBResponse<AssetDoc>>,
    Promise<DBResponse<AssetDoc[]>>,
  ] = [
    getAssetFromDb(assetId),
    getAssetPartsFromDb(assetId),
  ]

  const responses = await Promise.all(promises)
  const getAssetDbRes = responses[0]
  const getAssetPartsDbRes = responses[1]

  if (!getAssetDbRes.isSuccess || !getAssetPartsDbRes.isSuccess)
    throw InternalServerError

  const { result: assetDoc } = getAssetDbRes
  const { result: assetPartsDocs } = getAssetPartsDbRes

  const asset = getAssetFromDoc(assetDoc)
  asset.parts = assetPartsDocs.map(doc => getAssetPartFromDoc(doc))
  const res: ApiRes<Asset> = { response: asset }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}

export const main = middyfy(handler)
