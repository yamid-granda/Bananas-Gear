import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import { verify } from 'jsonwebtoken'
import { middyfy } from '../../../utils/lambda.util'
import { getCompanyById } from '../../../utils/db/company/getCompanyById.db'

interface JwtPayload {
  secretKey: string | null
}

const dynamoDb = new DocumentClient()

const handler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { token, companyId } = event.queryStringParameters

  if (!token) throw new BadRequestError('token is required')
  if (!companyId) throw new BadRequestError('companyId is required')

  const document = await getCompanyById(companyId)

  let decoded: JwtPayload
  try {
    decoded = verify(token, document.salt + process.env.JWT_SECRET) as JwtPayload
  }
  catch (error) {
    decoded = { secretKey: null }
  }

  const hasAccess = decoded.secretKey && document.secretKey === decoded.secretKey
  if (!hasAccess) throw new Error("you don't have access to this company")

  await dynamoDb
    .put({
      TableName: `${process.env.WEB_SOCKET_CONNECTIONS_TABLE_NAME}`,
      Item: {
        PK: 'LIVE',
        SK: event.requestContext.connectionId,
        companyId,
      },
    })
    .promise()

  return { statusCode: 200, body: null }
}

export const main = middyfy(handler)
