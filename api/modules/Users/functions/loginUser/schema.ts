import type { FromSchema } from 'json-schema-to-ts'
import type { RemoveIndex } from '../../../../utils'
import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '../../../../utils/sharedUtils/configs/user.config'

export const userLoginReqSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: USER_EMAIL_MIN_LENGTH,
      maxLength: USER_EMAIL_MAX_LENGTH,
    },
    password: {
      type: 'string',
      minLength: USER_PASSWORD_MIN_LENGTH,
      maxLength: USER_PASSWORD_MAX_LENGTH,
    },
  },
} as const

type UserLoginReqFlatSchema = FromSchema<typeof userLoginReqSchema>

export type UserLoginReq = RemoveIndex<UserLoginReqFlatSchema>

