import type { BaseDocument, UserCreator } from '..'

export interface UserDocument extends BaseDocument, UserCreator {
  status: 'active' | 'inactivated' | 'pending'
  nameSortKey: string
  invitationAcceptedAt?: string
}
