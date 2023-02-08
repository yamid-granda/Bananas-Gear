import type { AssetDoc } from '../types'
import type { DBResponse } from '@/api/utils/interfaces/db'
import { queryDynamoDBDocuments } from '@/api/utils/clients/dynamoDB'

export const getAssetPartsFromDb = async (
  assetId: string,
): Promise<DBResponse<AssetDoc[]>> => {
  const dbRes = await queryDynamoDBDocuments({
    name: 'GET_ASSET_PARTS',
    params: {
      TableName: `${process.env.ASSETS_TABLE_NAME}`,
      IndexName: 'assetId',
      ExpressionAttributeNames: {
        '#assetId': 'assetId',
      },
      ExpressionAttributeValues: {
        ':assetId': assetId,
      },
      KeyConditionExpression: '#assetId = :assetId',
    },
  })

  const result = dbRes.documents as AssetDoc[] | null
  const isSuccess = Boolean(result)

  if (!isSuccess) {
    return {
      isSuccess: false,
      result: null,
    }
  }

  return {
    isSuccess,
    result,
  }
}
