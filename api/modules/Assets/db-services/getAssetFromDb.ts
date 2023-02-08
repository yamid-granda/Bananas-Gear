import type { AssetDoc } from '../types'
import type { DBResponse } from '@/api/utils/interfaces/db'
import { getDynamoDBDocument } from '@/api/utils/clients/dynamoDB'

export const getAssetFromDb = async (
  id: string,
): Promise<DBResponse<AssetDoc>> => {
  const dbRes = await getDynamoDBDocument({
    name: 'GET_ASSET',
    params: {
      TableName: `${process.env.ASSETS_TABLE_NAME}`,
      Key: { id },
    },
  })

  const result = dbRes.Item as AssetDoc | null
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
