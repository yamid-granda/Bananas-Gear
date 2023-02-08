import { InternalServerError } from 'http-errors-enhanced'
import { updateDocumentFromDynamoDB } from '../../clients/dynamoDB/updateDynamoDBDocument'
import type { CompanyRegisterRequestDocument } from '../../sharedUtils/interfaces'

export const updateCompanyRegisterRequestBy = async(
  id: string,
  updateDocument: Partial<CompanyRegisterRequestDocument>,
): Promise<CompanyRegisterRequestDocument> => {
  const response = await updateDocumentFromDynamoDB({
    name: 'UPDATE_COMPANY_REGISTER_REQUEST',
    updateDocument,
    params: {
      TableName: `${process.env.CompanyRegisterRequests3TableName}`,
      Key: { id },
    },
  })

  if (!response.Attributes) throw new InternalServerError('DynamoDB: response has not attributes')

  const document = response.Attributes as CompanyRegisterRequestDocument

  return document
}
