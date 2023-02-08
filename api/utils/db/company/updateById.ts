import { InternalServerError } from 'http-errors-enhanced'
import { updateDocumentFromDynamoDB } from '../../clients/dynamoDB/updateDynamoDBDocument'
import type { CompanyDocument } from '../../sharedUtils/interfaces'

export const updateCompanyById = async (
  id: string,
  updateDocument: Partial<CompanyDocument>,
): Promise<CompanyDocument> => {
  const response = await updateDocumentFromDynamoDB({
    name: 'UPDATE_COMPANY_BY_ID',
    updateDocument,
    params: {
      TableName: `${process.env.COMPANIES_TABLE_NAME}`,
      Key: { id },
    },
  })

  if (!response.Attributes)
    throw new InternalServerError('DynamoDB: response has not attributes')

  const document = response.Attributes as CompanyDocument

  return document
}
