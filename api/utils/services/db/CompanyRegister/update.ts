import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import type { CompanyRegisterRequest } from '../../../sharedUtils/interfaces/companyRegisterRequest/companyRegisterRequest.interface'
import { updateDocumentFromDynamoDB } from '../../../clients/dynamoDB/updateDynamoDBDocument'
import type { CompanyRegisterRequestDocument } from '../../../sharedUtils/interfaces'

export async function updateCompanyRegister(
  id: string,
  updateDocument: Partial<CompanyRegisterRequestDocument>,
  config?: DocumentClient.UpdateItemInput,
): Promise<CompanyRegisterRequest> {
  const { Attributes } = await updateDocumentFromDynamoDB({
    name: 'UPDATE_COMPANY_REGISTER',
    updateDocument,
    params: {
      TableName: `${process.env.CompanyRegisterRequests3TableName}`,
      Key: { id },
    },
    ...config,
  })
  const document = Attributes as CompanyRegisterRequest
  return document
}
