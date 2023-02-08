import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InternalServerError } from 'http-errors-enhanced'
import { createDBClient } from './dynamoDB.client'

interface DynamoDBGetRequest {
  name: string
  params: DocumentClient.GetItemInput
}

export async function getDynamoDBDocument({
  params,
}: DynamoDBGetRequest): Promise<DocumentClient.GetItemOutput> {
  const dbClient = createDBClient()
  return dbClient
    .get({ ...params })
    .promise()
    .catch((error: Error) => {
      console.error(error.message)
      throw new InternalServerError(`Database: ${error.message}`)
    })
}
