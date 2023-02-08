import type { UserDocument } from '../../sharedUtils/interfaces/user/userDocument.interface'
import { queryDynamoDBDocuments } from '../../clients/dynamoDB/queryDynamoDBDocuments'
import type { DBResponse } from '../../interfaces/db'

export const getCompanyUserByEmail = async (
  companyId: string,
  email: string,
): Promise<DBResponse<UserDocument>> => {
  const lowerCaseEmail = email.toLowerCase()
  const queryResponse = await queryDynamoDBDocuments({
    name: 'GET_USERS_BY_EMAIL',
    params: {
      TableName: `${process.env.USERS_TABLE_NAME}`,
      IndexName: 'companyId-email',
      ExpressionAttributeNames: {
        '#companyId': 'companyId',
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':companyId': companyId,
        ':email': lowerCaseEmail,
      },
      KeyConditionExpression: '#companyId = :companyId AND #email = :email',
    },
  })

  const result = queryResponse.documents[0] || null

  return {
    isSuccess: Boolean(result),
    result,
  }
}
