import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
} from '../../utils/sharedUtils/configs/user.config'

export default {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: USER_EMAIL_MIN_LENGTH,
      maxLength: USER_EMAIL_MAX_LENGTH,
    },
  },
} as const
