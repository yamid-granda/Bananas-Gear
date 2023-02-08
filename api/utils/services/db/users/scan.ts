import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { scanDynamoDBDocuments } from '../../..'
import type { UserDocument } from '../../../sharedUtils/interfaces/user/userDocument.interface'

interface ScanResponse<DocumentsType> {
  documents: DocumentsType[]
  output: DocumentClient.ScanOutput
}

export async function scanUsers(
  config?: Partial<DocumentClient.ScanInput>,
): Promise<ScanResponse<UserDocument>> {
  const scanOutput = await scanDynamoDBDocuments({
    name: 'SCAN_USERS',
    params: {
      TableName: `${process.env.USERS_TABLE_NAME}`,
      AttributesToGet: ['id', 'name', 'status'],
      ...config,
    },
  })

  const { Items: users, ...output } = scanOutput
  const documents = users.map(item => item) as UserDocument[]

  return {
    documents,
    output,
  }
}
