import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InternalServerError } from 'http-errors-enhanced'
import type { DeleteDynamoDBDocumentOutput } from '../../../utils'
import type { DeleteDynamoDBDocument } from '../../../utils/interfaces/dynamoDB/DeleteDynamoDBDocument.interface'
import { createDBClient } from './dynamoDB.client'

const dbClient = createDBClient()
const countsTableName = `${process.env.countsTable}`

export async function deleteDynamoDBDocument({
  params,
  countsTableSuffix,
}: DeleteDynamoDBDocument): Promise<DeleteDynamoDBDocumentOutput<any>> {
  const { TableName, ...deleteParams } = params

  if (!TableName)
    throw new InternalServerError('DynamoDB: table name is required')

  const tableName = countsTableSuffix ? `${TableName}-${countsTableSuffix}` : TableName

  const output = await dbClient
    .delete({
      ExpressionAttributeNames: { '#id': 'id' },
      ConditionExpression: 'attribute_exists(#id)',
      TableName,
      ...deleteParams,
    })
    .promise()
    .then(async (response) => {
      await decrementsInCountsTable(tableName)
      return response
    })

  return {
    document: {},
    output,
  }
}

async function decrementsInCountsTable(tableName: string): Promise<DocumentClient.UpdateItemOutput> {
  const updateParams: DocumentClient.UpdateItemInput = {
    TableName: countsTableName,
    Key: { type: tableName },
    ExpressionAttributeNames: { '#count': 'count' },
    ExpressionAttributeValues: { ':count': -1 },
    UpdateExpression: 'ADD #count :count',
  }

  return await dbClient
    .update(updateParams)
    .promise()
}
