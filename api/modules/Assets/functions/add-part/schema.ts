import { AssetConfig } from '../../configs'
import { ApiConfig } from '../../../../types'

export const addAssetPartSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: AssetConfig.NAME_MIN_LENGTH,
      maxLength: AssetConfig.NAME_MAX_LENGTH,
    },
    parentAssetId: {
      type: 'string',
      minLength: ApiConfig.ID_MIN_LENGTH,
      maxLength: ApiConfig.ID_MAX_LENGTH,
    },
  },
} as const
