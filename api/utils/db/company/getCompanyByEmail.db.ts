import { queryDynamoDBDocuments } from '../../clients/dynamoDB/queryDynamoDBDocuments'
import type { CompanyDocument } from '../../sharedUtils'

export async function getCompanyByEmail(email: string): Promise<CompanyDocument | null> {
  const response = await queryDynamoDBDocuments({
    name: 'GET_COMPANY_BY_EMAIL',
    params: {
      TableName: `${process.env.COMPANIES_TABLE_NAME}`,
      IndexName: 'companies-email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': email,
      },
      KeyConditionExpression: '#email = :email',
      Limit: 1,
    },
  })
  return response.documents.length ? response.documents[0] : null
}
