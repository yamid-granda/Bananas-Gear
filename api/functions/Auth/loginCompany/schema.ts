import {
  COMPANY_EMAIL_MAX_LENGTH,
  COMPANY_EMAIL_MIN_LENGTH,
  COMPANY_PASSWORD_MAX_LENGTH,
  COMPANY_PASSWORD_MIN_LENGTH,
} from '../../../utils/sharedUtils/configs/company.config'

export default {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: COMPANY_EMAIL_MIN_LENGTH,
      maxLength: COMPANY_EMAIL_MAX_LENGTH,
    },
    password: {
      type: 'string',
      minLength: COMPANY_PASSWORD_MIN_LENGTH,
      maxLength: COMPANY_PASSWORD_MAX_LENGTH,
    },
  },
} as const
