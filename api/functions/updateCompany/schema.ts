import {
  COMPANY_NAME_MAX_LENGTH,
  COMPANY_NAME_MIN_LENGTH,
} from '../../utils/sharedUtils/configs/company.config'

export default {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: COMPANY_NAME_MIN_LENGTH,
      maxLength: COMPANY_NAME_MAX_LENGTH,
    },
  },
} as const
