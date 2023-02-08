import { queryDynamoDBDocuments } from 'utils'
import type { UserDocument } from '../../../../utils/sharedUtils/interfaces/user/userDocument.interface'
import type { DBResponse } from '../../../../utils/interfaces/db'

export type GetUsersByEmailRes = Promise<DBResponse<UserDocument[]>>

export async function getUsersByEmail(email: string): GetUsersByEmailRes {
  const queryResponse = await queryDynamoDBDocuments({
    name: 'GET_USERS_BY_EMAIL',
    params: {
      TableName: `${process.env.USERS_TABLE_NAME}`,
      IndexName: 'email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': email,
      },
      KeyConditionExpression: '#email = :email',
    },
  })

  const result = queryResponse.documents
  const isSuccess = Boolean(result.length)

  if (!isSuccess) {
    return {
      isSuccess,
      result: null,
    }
  }

  return {
    isSuccess,
    result,
  }
}
