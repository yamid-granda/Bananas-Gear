import type { UserDocument } from '@/api/utils/sharedUtils/interfaces/user/userDocument.interface'

// public request / response

export interface UserLogger {
  email: string
  password: string
}

// private DB document

export type UserDocUpdater = Partial<UserDocument>
