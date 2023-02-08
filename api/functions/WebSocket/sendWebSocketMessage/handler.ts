import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ApiGatewayManagementApi } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const dynamoDb = new DocumentClient()
const TableName = `${process.env.WEB_SOCKET_CONNECTIONS_TABLE_NAME}`

interface WebSocketMessage {
  companyId: string
  message: {
    event: string
    response: any
  }
}

interface WebSocketAPIGatewayProxyEvent extends Omit<APIGatewayProxyEvent, 'body'> {
  body: WebSocketMessage
}

const handler = async(event: WebSocketAPIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body } = event
  const { companyId } = body

  const currentConnections = await dynamoDb
    .scan({
      TableName,
      IndexName: 'companyId',
      ProjectionExpression: 'SK',
      FilterExpression: 'companyId = :companyId',
      ExpressionAttributeValues: {
        ':companyId': companyId,
      },
    })
    .promise()

  // API Gateway WebSocket service
  const apiGateway = new ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    // endpoint: process.env.websocketsApiDomain,
    endpoint: `${process.env.WEB_SOCKET_API_DOMAIN}`,
  })

  if (currentConnections && currentConnections.Items) {
    // Loop on all your active connections
    const sendMessageToAllConnections = currentConnections.Items.map(
      async({ SK: connectionId }) => {
        try {
          // And send them a message!
          await apiGateway
            .postToConnection({
              ConnectionId: connectionId,
              Data: JSON.stringify(body.message),
            })
            .promise()
        }
        catch (error) {
          if (error.statusCode === 410) {
            await dynamoDb
              .delete({
                TableName,
                Key: {
                  PK: 'LIVE',
                  SK: connectionId,
                },
              })
              .promise()
          }
          else {
            throw error
          }
        }
      },
    )

    await Promise.all(sendMessageToAllConnections)
  }
  return { statusCode: 200, body: null }
}

export const main = handler
