import {
  COMPANY_DIAL_CODE_MAX_LENGTH,
  COMPANY_DIAL_CODE_MIN_LENGTH,
  COMPANY_EMAIL_MAX_LENGTH,
  COMPANY_EMAIL_MIN_LENGTH,
  COMPANY_ISO2_MAX_LENGTH,
  COMPANY_ISO2_MIN_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_PASSWORD_MAX_LENGTH,
  COMPANY_PASSWORD_MIN_LENGTH,
  COMPANY_PHONE_MAX_LENGTH,
  COMPANY_PHONE_MIN_LENGTH,
} from '../../utils/sharedUtils/configs/company.config'

export default {
  type: 'object',
  required: ['email', 'name', 'password', 'phone', 'iso2', 'dialCode'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: COMPANY_EMAIL_MIN_LENGTH,
      maxLength: COMPANY_EMAIL_MAX_LENGTH,
    },
    name: {
      type: 'string',
      minLength: COMPANY_NAME_MIN_LENGTH,
      maxLength: COMPANY_NAME_MAX_LENGTH,
    },
    password: {
      type: 'string',
      minLength: COMPANY_PASSWORD_MIN_LENGTH,
      maxLength: COMPANY_PASSWORD_MAX_LENGTH,
    },
    phone: {
      type: 'string',
      minLength: COMPANY_PHONE_MIN_LENGTH,
      maxLength: COMPANY_PHONE_MAX_LENGTH,
    },
    iso2: {
      type: 'string',
      minLength: COMPANY_ISO2_MIN_LENGTH,
      maxLength: COMPANY_ISO2_MAX_LENGTH,
    },
    dialCode: {
      type: 'string',
      minLength: COMPANY_DIAL_CODE_MIN_LENGTH,
      maxLength: COMPANY_DIAL_CODE_MAX_LENGTH,
    },
  },
} as const
