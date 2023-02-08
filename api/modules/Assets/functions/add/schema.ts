import { AssetConfig } from '../../configs'

export const addAssetSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: AssetConfig.NAME_MIN_LENGTH,
      maxLength: AssetConfig.NAME_MAX_LENGTH,
    },
  },
} as const
