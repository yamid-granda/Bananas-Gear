import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError, InternalServerError } from 'http-errors-enhanced'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../utils/apiGateway.util'
// import { createDBClient } from '../../utils/clients/dynamoDB/dynamoDB.client'
import { middyfy } from '../../utils/lambda.util'
import { scanUsers } from '../../utils/services/db/users/scan'
import { createDBClient } from '../../utils'
import type schema from './schema'

interface PathParameters {
  companyId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, PathParameters> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const requestLastKey: any = event.body.lastKey || null
  const dbClient = createDBClient()
  let lastKey = null

  do {
    const { documents: users, output } = await scanUsers({
      ExclusiveStartKey: requestLastKey,
      AttributesToGet: ['id', 'name'],
      // Limit: 100,
    })

    users.map((user) => {
      const params = {
        TableName: `${process.env.USERS_TABLE_NAME}`,
        Key: { id: user.id },
      }
      const updateDocument = { nameSortKey: user.name.toLowerCase() }

      let UpdateExpression = ''
      const ExpressionAttributeNames: any = {}
      let ExpressionAttributeValues: any = {}
      if (params.Key) ExpressionAttributeValues = { ':id': params.Key.id }

      for (const [key, value] of Object.entries(updateDocument)) {
        if (value !== undefined) {
          const keyName = `#${key}`
          const keyValue = `:${key}`
          UpdateExpression += `${keyName}=${keyValue},`
          ExpressionAttributeNames[`${keyName}`] = key
          ExpressionAttributeValues[`${keyValue}`] = value
        }
      }

      if (!UpdateExpression) throw new BadRequestError('Update request is empty')

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
    })

    lastKey = output.LastEvaluatedKey
  } while (false)

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, lastKey, requestLastKey }),
  }
}

export const main = middyfy(handler)
