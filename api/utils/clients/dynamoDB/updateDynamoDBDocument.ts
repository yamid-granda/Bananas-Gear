import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BadRequestError, InternalServerError } from 'http-errors-enhanced'
import { createDBClient } from './dynamoDB.client'

interface DynamoDBUpdateRequest {
  name: string
  params: DocumentClient.UpdateItemInput
  updateDocument?: any
}

export const updateDocumentFromDynamoDB = async ({
  params,
  updateDocument = {},
}: DynamoDBUpdateRequest): Promise<DocumentClient.UpdateItemOutput> => {
  const dbClient = createDBClient()
  let UpdateExpression = ''
  const ExpressionAttributeNames: any = {}
  let ExpressionAttributeValues: any = {}
  if (params.Key)
    ExpressionAttributeValues = { ':id': params.Key.id }

  for (const [key, value] of Object.entries(updateDocument)) {
    if (value !== undefined) {
      const keyName = `#${key}`
      const keyValue = `:${key}`
      UpdateExpression += `${keyName}=${keyValue},`
      ExpressionAttributeNames[`${keyName}`] = key
      ExpressionAttributeValues[`${keyValue}`] = value
    }
  }

  if (!UpdateExpression)
    throw new BadRequestError('Update request is empty')

  UpdateExpression = `set ${UpdateExpression.slice(0, -1)}`

  return dbClient
    .update({
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ConditionExpression: 'id = :id',
      ReturnValues: 'ALL_NEW',
      ...params,
    })
    .promise()
    .catch((error: Error) => {
      throw new InternalServerError(`Database: ${error.message}`)
    })
}
