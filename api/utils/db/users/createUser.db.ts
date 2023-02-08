import { createDynamoDBDocument } from '../../clients/dynamoDB/createDynamoDBDocument'
import type { UserCreator } from '../../sharedUtils/interfaces'
import type { UserDocument } from '../../sharedUtils/interfaces/user/userDocument.interface'

export const createUser = async (request: UserCreator): Promise<UserDocument> => {
  const document: UserDocument = (
    await createDynamoDBDocument({
      name: 'REGISTER_USER',
      params: {
        TableName: `${process.env.USERS_TABLE_NAME}`,
        Item: request,
      },
    })
  ).document

  return document
}
