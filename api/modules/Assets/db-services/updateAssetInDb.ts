import type {
  AssetDoc,
  AssetUpdateDoc,
  AssetUpdateReqDoc,
} from '../types'

import {
  updateDocumentFromDynamoDB,
} from '@/api/utils/clients/dynamoDB/index'
import type { DBResponse } from '@/api/utils/interfaces/db'

export const updateAssetInDb = async (
  id: string,
  updateReqDoc: AssetUpdateReqDoc,
): Promise<DBResponse<AssetDoc>> => {
  const updateDoc: AssetUpdateDoc = { name: updateReqDoc.name }

  if (updateReqDoc.name)
    updateDoc.nameSortKey = updateReqDoc.name.toLowerCase()

  const dbRes = await updateDocumentFromDynamoDB({
    name: 'UPDATE_ASSET',
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
