import type { UserCreator } from '../user'

export interface UserDocCreateReq extends UserCreator {
  companyId: string
}
