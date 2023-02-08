import type { UserDocCreateReq } from '../../../utils/sharedUtils/interfaces'
import type { UserDocument }
  from '../../../utils/sharedUtils/interfaces/user/userDocument.interface'
import { createDynamoDBDocByTransaction } from '../../clients/dynamoDB/createDynamoDBDocByTransaction'
import type { User } from '../../sharedUtils/interfaces/user/user.interface'

interface UserDocCreator extends UserDocCreateReq {
  status: UserDocument['status']
  nameSortKey: string
  nameLowerCase: string
  emailLowerCase: string
}

function responseParser(document: UserDocument): User {
  return {
    id: document.id,
    createdAt: document.createdAt,
    email: document.email,
    name: document.name,
    status: document.status,
    companyId: document.companyId,
  }
}

export const addCompanyUser = async (
  userDocCreateReq: UserDocCreateReq,
): Promise<UserDocument> => {
  const { name, email, companyId } = userDocCreateReq
  const nameSortKey = name.toLocaleLowerCase()
  const lowerCaseEmail = email.toLowerCase()

  const userDocCreator: UserDocCreator = {
    ...userDocCreateReq,
    nameSortKey,
    nameLowerCase: nameSortKey,
    email: lowerCaseEmail,
    emailLowerCase: lowerCaseEmail,
    status: 'pending',
  }

  return (
    await createDynamoDBDocByTransaction({
      name: 'ADD_COMPANY_USER',
      countsTableSuffix: companyId,
      webSocketCompanyId: companyId,
      responseParser,
      params: {
        TableName: `${process.env.USERS_TABLE_NAME}`,
        Item: userDocCreator,
      },
    })
  ).document
}
