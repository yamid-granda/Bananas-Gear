import { generateKey } from '../../generateKey.util'
import type {
  CompanyRegisterRequestCreationObject,
  CompanyRegisterRequestDocument,
  RegisterCompanyRequest,
} from '../../../utils/sharedUtils/interfaces'
import { createDynamoDBDocument } from '../../clients/dynamoDB/createDynamoDBDocument'
import type { CreateDynamoDBDocumentOutput } from '../../../utils'

export const createCompanyRegisterRequest = async(
  request: RegisterCompanyRequest,
): Promise<CreateDynamoDBDocumentOutput<CompanyRegisterRequestDocument>> => {
  const secretKey = generateKey()

  const creationDocument: CompanyRegisterRequestCreationObject = {
    ...request,
    email: request.email.toLowerCase(),
    secretKey,
    status: 'emailValidationPending',
    validationAttempts: 0,
  }

  return createDynamoDBDocument({
    name: 'CREATE_COMPANY_REGISTER_REQUEST',
    params: {
      TableName: `${process.env.CompanyRegisterRequests3TableName}`,
      Item: creationDocument,
    },
  })
}
