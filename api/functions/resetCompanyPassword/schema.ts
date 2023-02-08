import { KEY_MAX_LENGTH, USER_PASSWORD_MAX_LENGTH, USER_PASSWORD_MIN_LENGTH } from '../../utils/'

export default {
  type: 'object',
  required: ['id', 'newPassword', 'secretKey'],
  properties: {
    id: {
      type: 'string',
      maxLength: KEY_MAX_LENGTH,
    },
    secretKey: {
      type: 'string',
      maxLength: KEY_MAX_LENGTH,
    },
    newPassword: {
      type: 'string',
      minLength: USER_PASSWORD_MIN_LENGTH,
      maxLength: USER_PASSWORD_MAX_LENGTH,
    },
  },
} as const
