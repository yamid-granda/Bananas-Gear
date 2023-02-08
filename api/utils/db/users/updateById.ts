import { updateDocumentFromDynamoDB } from '../../clients/dynamoDB/updateDynamoDBDocument'
import type { UserDocument } from '../../sharedUtils/interfaces/user/userDocument.interface'
import type { DBResponse } from '../../interfaces/db'
import type { UserDocUpdater } from '@/api/modules/Users/types'

export const updateUserById = async (
  id: string,
  updateDocument: UserDocUpdater,
): Promise<DBResponse<UserDocument>> => {
  const response = await updateDocumentFromDynamoDB({
    name: 'UPDATE_USER_BY_ID',
    updateDocument,
    params: {
      TableName: `${process.env.USERS_TABLE_NAME}`,
      Key: { id },
    },
  })

  if (!response.Attributes) {
    return {
      isSuccess: false,
      result: null,
    }
  }

  const result = response.Attributes as UserDocument

  return {
    isSuccess: true,
    result,
  }
}
