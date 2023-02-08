import type { UserDocument } from '../../sharedUtils/interfaces/user/userDocument.interface'
import type { DBResponse } from '../../interfaces/db'
import { getDynamoDBDocument } from '../../clients/dynamoDB/getDynamoDBDocument'

export const getUserById = async (id: string): Promise<DBResponse<UserDocument>> => {
  const queryResponse = await getDynamoDBDocument({
    name: 'GET_USER_BY_ID',
    params: {
      TableName: `${process.env.USERS_TABLE_NAME}`,
      Key: { id },
    },
  })

  if (!queryResponse.Item) {
    return {
      isSuccess: false,
      result: null,
    }
  }

  const result = queryResponse.Item as UserDocument

  return {
    isSuccess: true,
    result,
  }
}
