import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import type { APIGatewayEvent } from 'aws-lambda'

const dynamoDb = new DocumentClient()

const handler = async (event: APIGatewayEvent) => {
  await dynamoDb
    .delete({
      TableName: `${process.env.WEB_SOCKET_CONNECTIONS_TABLE_NAME}`,
      Key: {
        PK: 'LIVE',
        SK: event.requestContext.connectionId,
      },
    })
    .promise()
  return { statusCode: 200 }
}

export const main = handler
