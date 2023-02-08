import type { User } from '../../../../utils'
import type { UserDocument } from '../../../../utils/sharedUtils/interfaces/user/userDocument.interface'

export function getUserFromDoc(doc: UserDocument): User {
  return {
    email: doc.email,
    createdAt: doc.createdAt,
    id: doc.id,
    status: doc.status,
    name: doc.name,
    companyId: doc.companyId,
  }
}
