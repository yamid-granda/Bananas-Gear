import {
  COMPANY_BUSINESS_SECTOR_MAX_LENGTH,
  COMPANY_BUSINESS_SECTOR_MIN_LENGTH,
  COMPANY_GREATER_NEED_MAX_LENGTH,
  COMPANY_GREATER_NEED_MIN_LENGTH,
  COMPANY_IDEAS_MAX_LENGTH,
  COMPANY_IDEAS_MIN_LENGTH,
} from '../../../utils/sharedUtils/configs/company.config'

export default {
  type: 'object',
  required: ['greaterNeed', 'ideas', 'businessSector'],
  properties: {
    greaterNeed: {
      type: 'string',
      minLength: COMPANY_GREATER_NEED_MIN_LENGTH,
      maxLength: COMPANY_GREATER_NEED_MAX_LENGTH,
    },
    businessSector: {
      type: 'string',
      minLength: COMPANY_BUSINESS_SECTOR_MIN_LENGTH,
      maxLength: COMPANY_BUSINESS_SECTOR_MAX_LENGTH,
    },
    ideas: {
      type: 'string',
      minLength: COMPANY_IDEAS_MIN_LENGTH,
      maxLength: COMPANY_IDEAS_MAX_LENGTH,
    },
  },
} as const
