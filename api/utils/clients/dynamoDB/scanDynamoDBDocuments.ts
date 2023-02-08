import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InternalServerError } from 'http-errors-enhanced'
import { createDBClient } from './dynamoDB.client'

interface DynamoDBScanRequest {
  name: string
  params: DocumentClient.ScanInput
}

export async function scanDynamoDBDocuments({
  params,
}: DynamoDBScanRequest): Promise<DocumentClient.ScanOutput> {
  const dbClient = createDBClient()
  return dbClient
    .scan({ ...params })
    .promise()
    .catch((error: Error) => {
      throw new InternalServerError(`Database: ${error.message}`)
    })
}
