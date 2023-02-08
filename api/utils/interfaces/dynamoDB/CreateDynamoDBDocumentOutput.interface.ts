import type { DocumentClient } from 'aws-sdk/clients/dynamodb'

export interface CreateDynamoDBDocumentOutput<Document> {
  output: DocumentClient.PutItemOutput
  document: Document
}

export interface CreateDynamoDBDocByTransactionOutput<Document> {
  output: DocumentClient.TransactWriteItemsOutput
  document: Document
}

export interface DeleteDynamoDBDocumentOutput<Document> {
  output: DocumentClient.DeleteItemOutput
  document: Document
}

export interface UpdateDynamoDBDocumentOutput<Document> {
  document: Document
}
