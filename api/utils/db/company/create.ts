import type { CompanyCreationObject, CompanyDocument } from '../../../utils/sharedUtils/interfaces'
import { createDynamoDBDocument } from '../../clients/dynamoDB/createDynamoDBDocument'
import type { CreateDynamoDBDocumentOutput } from '../../../utils'

export const createCompany = async(
  creationDocument: CompanyCreationObject,
): Promise<CreateDynamoDBDocumentOutput<CompanyDocument>> => {
  return createDynamoDBDocument({
    name: 'CREATE_COMPANY',
    params: {
      TableName: `${process.env.COMPANIES_TABLE_NAME}`,
      Item: {
        ...creationDocument,
        email: creationDocument.email.toLowerCase(),
      },
    },
  })
}
