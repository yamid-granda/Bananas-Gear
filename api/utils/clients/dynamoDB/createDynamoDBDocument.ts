import { InternalServerError } from 'http-errors-enhanced'
import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { generateIdFromDate } from '../../generateIdFromDate.util'
import type { CreateDynamoDBDocumentOutput } from '../../../utils/interfaces/dynamoDB/CreateDynamoDBDocumentOutput.interface'
import { createDBClient } from './dynamoDB.client'
// import { Lambda } from 'aws-sdk'

interface DynamoDBDocCreator {
  name: string
  params: DocumentClient.PutItemInput
  countsTableSuffix?: string
  ignoreBaseDocument?: boolean
  responseParser?: any
  webSocketCompanyId?: string
}

// const region = process.env.AWS_REGION || 'us-east-1'
// const lambda = new Lambda({ region })

const dbClient = createDBClient()
const countsTableName = `${process.env.countsTable}`

export async function createDynamoDBDocument({
  params,
  countsTableSuffix,
  ignoreBaseDocument,
}: DynamoDBDocCreator): Promise<CreateDynamoDBDocumentOutput<any>> {
  const date = new Date()
  const { Item, TableName, ...putParams } = params

  if (!TableName)
    throw new InternalServerError('DynamoDB: table name is required')

  const tableName = countsTableSuffix ? `${TableName}-${countsTableSuffix}` : TableName

  const baseDocument = {
    id: generateIdFromDate(date),
    createdAt: date.toISOString(),
  }

  const newDocument = ignoreBaseDocument ? Item : { ...Item, ...baseDocument }

  const output = await dbClient
    .put({
      ExpressionAttributeNames: { '#id': 'id' },
      ConditionExpression: 'attribute_not_exists(#id)',
      Item: newDocument,
      TableName,
      ...putParams,
    })
    .promise()
    .then(async (response) => {
      await incrementDocInCountsTable(tableName)
      return response
    })

  const document = newDocument

  // ----------------------------------------------------------------------------------------------
  // * WebSocket Event Handler
  // ----------------------------------------------------------------------------------------------

  // if (webSocketCompanyId) {
  //   let response = null
  //   if (responseParser) response = responseParser(document)
  //   const webSocketPayload = {
  //     body: {
  //       companyId: webSocketCompanyId,
  //       message: {
  //         event: name,
  //         response,
  //       },
  //     },
  //   }
  //   const service = process.env.SERVICE
  //   const stage = process.env.STAGE
  //   const webSocketFunctionName = `${service}-${stage}-sendWebSocketMessage`
  //   await lambda
  //     .invoke({
  //       FunctionName: webSocketFunctionName,
  //       InvocationType: 'Event',
  //       LogType: 'Tail',
  //       Payload: JSON.stringify(webSocketPayload),
  //     })
  //     .promise()
  // }

  return {
    document,
    output,
  }
}

async function incrementDocInCountsTable(tableName: string): Promise<DocumentClient.UpdateItemOutput> {
  const updateParams: DocumentClient.UpdateItemInput = {
    TableName: countsTableName,
    Key: { type: tableName },
    ExpressionAttributeNames: { '#count': 'count' },
    ExpressionAttributeValues: { ':count': 1 },
    UpdateExpression: 'ADD #count :count',
  }

  return await dbClient
    .update(updateParams)
    .promise()
}
