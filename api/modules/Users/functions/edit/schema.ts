import type { FromSchema } from 'json-schema-to-ts'
import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '../../../../utils/sharedUtils/configs/user.config'
import type { RemoveIndex } from '@/api/utils'

export const userEditorSchema = {
  type: 'object',
  required: ['email', 'password', 'name'],
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
    name: {
      type: 'string',
      minLength: USER_NAME_MIN_LENGTH,
      maxLength: USER_NAME_MAX_LENGTH,
    },
  },
} as const

type UserEditorFromSchema = FromSchema<typeof userEditorSchema>

export type UserUpdater = Partial<RemoveIndex<UserEditorFromSchema>>
