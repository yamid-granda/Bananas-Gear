import type { UserDocument } from './userDocument.interface'

export interface User {
  companyId: UserDocument['companyId']
  createdAt: UserDocument['createdAt']
  email: UserDocument['email']
  id: UserDocument['id']
  name: UserDocument['name']
  status: UserDocument['status']
}
