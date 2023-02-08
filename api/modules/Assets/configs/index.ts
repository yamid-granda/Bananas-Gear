export enum AssetConfig {
  NAME_MAX_LENGTH = 100,
  NAME_MIN_LENGTH = 1,
}

export enum AssetsApiPath {
  ADD = '/companies/{companyId}/assets',
  ADD_PART = '/companies/{companyId}/assets/{assetId}',
  QUERY = '/companies/{companyId}/assets',
  GET = '/assets/{assetId}',
  UPDATE = '/assets/{assetId}',
  INACTIVATE = '/assets/{assetId}/inactivate',
  ACTIVATE = '/assets/{assetId}/activate',
}

export enum AssetsTableIndex {
  ASSET_ID = 'assetId',
  COMPANY_ID__NAME_SORT_KEY = 'companyId-nameSortKey',
}

export const NULL_ASSET_ID_VALUE = 'null'
