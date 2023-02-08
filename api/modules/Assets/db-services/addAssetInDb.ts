import type {
  AssetAddDoc,
  AssetAddReqDoc,
  AssetDoc,
} from '../types'

import { AssetStatus } from '../types'
import { NULL_ASSET_ID_VALUE } from '../configs'
import { createDynamoDBDocument } from '@/api/utils/clients/dynamoDB/index'
import type { DBResponse } from '@/api/utils/interfaces/db'

export const addAssetInDb = async (
  addReqDoc: AssetAddReqDoc,
): Promise<DBResponse<AssetDoc>> => {
  const nameSortKey = addReqDoc.name.toLowerCase()

  const addDoc: AssetAddDoc = {
    companyId: addReqDoc.companyId,
    createdBy: addReqDoc.createdBy,
    name: addReqDoc.name,
    nameSortKey,
    assetId: addReqDoc.assetId || NULL_ASSET_ID_VALUE,
    parentId: addReqDoc.parentId,
    status: AssetStatus.ACTIVE,
  }

  const dbRes = await createDynamoDBDocument({
    name: 'ADD_ASSET',
    countsTableSuffix: addReqDoc.companyId,
    params: {
      TableName: `${process.env.ASSETS_TABLE_NAME}`,
      Item: addDoc,
    },
  })

  const result = dbRes.document
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
