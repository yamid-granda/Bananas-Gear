import type { FromSchema } from 'json-schema-to-ts'
import type { addAssetSchema } from '../functions/add/schema'
import type { updateAssetSchema } from '../functions/update/schema'
import type { addAssetPartSchema } from '../functions/add-part/schema'
import type { BaseDocument } from '@/api/utils'

// public API response

export interface Asset extends BaseDocument {
  createdBy: string
  name: string
  status: AssetStatus
  parts: AssetParts
}

export interface AssetPart extends BaseDocument {
  assetId: string
  createdBy: string
  name: string
  status: AssetStatus
  parentId: string
}

export type AssetParts = AssetPart[]
export type AssetAdder = FromSchema<typeof addAssetSchema>
export type AssetPartAdder = FromSchema<typeof addAssetPartSchema>
export type AssetUpdater = Partial<FromSchema<typeof updateAssetSchema>>
export type AssetAttrs = Partial<Asset>
export type AssetPartAttrs = Partial<AssetPart>

export enum AssetStatus {
  ACTIVE = 'active',
  INACTIVATED = 'inactivated',
}

// private DB document

export type AssetDoc = BaseDocument & AssetAddDoc

export interface AssetAddDoc {
  assetId: string
  companyId: string
  createdBy: string
  name: string
  nameSortKey: string
  status: AssetStatus
  parentId?: string
}

export interface AssetAddReqDoc {
  assetId: string
  companyId: string
  createdBy: string
  name: string
  parentId?: string
}

export type AssetUpdateDoc = Partial<AssetDoc>

export interface AssetUpdateReqDoc {
  name?: string
}

