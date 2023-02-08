import type { DocumentClient } from 'aws-sdk/clients/dynamodb'

export interface DeleteDynamoDBDocument {
  name: string
  params: DocumentClient.DeleteItemInput
  countsTableSuffix?: string
}
