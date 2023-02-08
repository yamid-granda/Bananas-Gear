import type { Auth, User } from '../../../../../utils'

export interface UserLoginRes extends Auth {
  user: User
}
