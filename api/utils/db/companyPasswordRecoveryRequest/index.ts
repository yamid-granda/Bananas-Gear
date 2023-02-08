import { InternalServerError } from 'http-errors-enhanced'
import type {
  BaseDocument,
  CreateDynamoDBDocumentOutput,
  UpdateDynamoDBDocumentOutput,
} from '../../../utils'
import {
  createDynamoDBDocument,
  getDynamoDBDocument,
  updateDocumentFromDynamoDB,
} from '../../../utils'

export interface CompanyPasswordRecoveryRequestCreationDocument {
  attempts: number
  companyId: string
  email: string
  secretKey: string
  status: 'completed' | 'pending'
}

export interface CompanyPasswordRecoveryRequestDocument
  extends BaseDocument,
  CompanyPasswordRecoveryRequestCreationDocument {}

const TableName = `${process.env.COMPANY_PASSWORD_RECOVERY_REQUESTS_TABLE_NAME}`

// ------------------------------------------------------------------------------------------------
// * Get
// ------------------------------------------------------------------------------------------------

export async function getCompanyPasswordRecoveryRequestById(
  id: string,
): Promise<CompanyPasswordRecoveryRequestDocument | null> {
  const response = await getDynamoDBDocument({
    name: 'GET_COMPANY_PASSWORD_RECOVERY_REQUEST_BY_ID',
    params: { Key: { id }, TableName },
  })
  let document = null
  if (response.Item) document = response.Item as CompanyPasswordRecoveryRequestDocument
  return document
}

// ------------------------------------------------------------------------------------------------
// * Create
// ------------------------------------------------------------------------------------------------

export interface CompanyPasswordRecoveryRequestCreator {
  companyId: string
  email: string
  secretKey: string
}

export async function createCompanyPasswordRecoveryRequest(
  creator: CompanyPasswordRecoveryRequestCreator,
): Promise<CreateDynamoDBDocumentOutput<CompanyPasswordRecoveryRequestDocument>> {
  const { email, secretKey, companyId } = creator
  const document: CompanyPasswordRecoveryRequestCreationDocument = {
    companyId,
    email,
    secretKey,
    attempts: 0,
    status: 'pending',
  }
  return createDynamoDBDocument({
    name: 'CREATE_COMPANY_PASSWORD_RECOVERY_REQUEST',
    params: { Item: document, TableName },
  })
}

// ------------------------------------------------------------------------------------------------
// * Update
// ------------------------------------------------------------------------------------------------

export interface CompanyPasswordRecoveryRequestUpdater {
  attempts?: CompanyPasswordRecoveryRequestCreationDocument['attempts']
  status?: CompanyPasswordRecoveryRequestCreationDocument['status']
}

export type CompanyPasswordRecoveryRequestUpdateDocument = CompanyPasswordRecoveryRequestUpdater

export async function updateCompanyPasswordRecoveryRequestById(
  id: string,
  updater: CompanyPasswordRecoveryRequestUpdater,
): Promise<UpdateDynamoDBDocumentOutput<CompanyPasswordRecoveryRequestDocument>> {
  const updateDocument: CompanyPasswordRecoveryRequestUpdateDocument = updater
  const response = await updateDocumentFromDynamoDB({
    name: 'UPDATE_COMPANY_PASSWORD_RECOVERY_REQUEST_BY_ID',
    updateDocument,
    params: { Key: { id }, TableName },
  })
  if (!response.Attributes) throw new InternalServerError('DynamoDB: response has not attributes')
  const document = response.Attributes as CompanyPasswordRecoveryRequestDocument
  return { document }
}

// ------------------------------------------------------------------------------------------------
// * Services
// ------------------------------------------------------------------------------------------------

export async function increaseCompanyPasswordRecoveryRequestAttempsById(id: string) {
  const response = await updateDocumentFromDynamoDB({
    name: 'INCREASE_COMPANY_PASSWORD_RECOVERY_REQUEST_ATTEMPTS_BY_ID',
    params: {
      Key: { id },
      TableName,
      ExpressionAttributeNames: { '#attempts': 'attempts' },
      ExpressionAttributeValues: { ':increment': { N: '1' } },
      UpdateExpression: 'SET #attempts = #attempts + :increment',
    },
  })
  if (!response.Attributes) throw new InternalServerError('DynamoDB: response has not attributes')
  const document = response.Attributes as CompanyPasswordRecoveryRequestDocument
  return { document }
}
