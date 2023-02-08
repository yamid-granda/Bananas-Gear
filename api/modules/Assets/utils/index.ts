import { NULL_ASSET_ID_VALUE } from '../configs'
import type { Asset, AssetDoc, AssetPart } from '../types'

export function getAssetFromDoc(doc: AssetDoc): Asset {
  return {
    createdAt: doc.createdAt,
    createdBy: doc.createdBy,
    id: doc.id,
    name: doc.name,
    status: doc.status,
    parts: [],
  }
}

export function getAssetPartFromDoc(doc: AssetDoc): AssetPart {
  return {
    assetId: doc.assetId === NULL_ASSET_ID_VALUE ? null : doc.assetId,
    createdAt: doc.createdAt,
    createdBy: doc.createdBy,
    id: doc.id,
    name: doc.name,
    parentId: doc.parentId,
    status: doc.status,
  }
}
