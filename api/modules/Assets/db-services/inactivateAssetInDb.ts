import type {
  AssetDoc,
  AssetUpdateDoc,
} from '../types'

import { AssetStatus } from '../types'
import { updateDocumentFromDynamoDB } from '@/api/utils/clients/dynamoDB/index'
import type { DBResponse } from '@/api/utils/interfaces/db'

export const inactivateAssetInDb = async (id: string): Promise<DBResponse<AssetDoc>> => {
  const updateDoc: AssetUpdateDoc = { status: AssetStatus.INACTIVATED }

  const dbRes = await updateDocumentFromDynamoDB({
    name: 'INACTIVATE_ASSET',
    updateDocument: updateDoc,
    params: {
      TableName: `${process.env.ASSETS_TABLE_NAME}`,
      Key: { id },
    },
  })

  const result = dbRes.Attributes as AssetDoc | null
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
