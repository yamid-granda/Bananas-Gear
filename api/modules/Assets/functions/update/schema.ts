import { AssetConfig } from '../../configs'

export const updateAssetSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: AssetConfig.NAME_MIN_LENGTH,
      maxLength: AssetConfig.NAME_MAX_LENGTH,
    },
  },
} as const
