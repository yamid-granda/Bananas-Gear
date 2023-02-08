import DynamoDB from 'aws-sdk/clients/dynamodb'
import { InternalServerError } from 'http-errors-enhanced'
import { getPartyQLStatement } from 'utils/clients/dynamoDBPartiQL'
import { filterDocsByQuery } from 'utils/httpFilter'
import type {
  QueryStringParameters,
} from '../../../shared/http/interfaces/QueryStringParameters'
import type { Pagination } from '../../../utils'
import type { UserDocument } from '../../../utils/sharedUtils/interfaces/user/userDocument.interface'
import { queryDynamoDBDocuments } from '../../clients/dynamoDB/queryDynamoDBDocuments'

interface Config {
  queryStringParameters?: QueryStringParameters
}

export async function getUsersByCompanyId2(
  companyId: string,
  { queryStringParameters }: Config,
): Promise<Pagination<UserDocument>> {
  const { limit, query, lastKey } = queryStringParameters

  const hasQuery = query && Object.keys(query).length > 0
  const Limit = hasQuery ? null : limit || 100
  const dynamoDBClient = new DynamoDB({ region: 'us-east-1' })
  const formatDocumentsPromises: Promise<void>[] = []

  let documents: UserDocument[] = []
  let NextToken = lastKey ? lastKey.replace(/\s/g, '+') : null
  let result: DynamoDB.ExecuteStatementOutput = {}
  let readConsumedCapacity = 0

  do {
    const Statement = getPartyQLStatement({
      tableName: process.env.USERS_TABLE_NAME,
      partitionKey: 'companyId',
      partitionKeyValue: companyId,
      queryStringParameters,
      uniqueSortKeys: ['email'],
      sortKeys: ['name', 'email'],
    })

    result = await dynamoDBClient
      .executeStatement({
        ReturnConsumedCapacity: 'TOTAL',
        Limit,
        NextToken,
        Statement,
      })
      .promise()
      .catch((error) => {
        console.error(error)
        throw new InternalServerError(error)
      })

    NextToken = result.NextToken
    readConsumedCapacity += result.ConsumedCapacity.CapacityUnits

    formatDocumentsPromises.push(new Promise((resolve) => {
      documents = documents.concat(result.Items.map(item => DynamoDB.Converter.unmarshall(item) as UserDocument))
      resolve()
    }))
  } while (documents.length < 10 && NextToken)

  await Promise.all(formatDocumentsPromises)

  return {
    readConsumedCapacity,
    lastKey: result.NextToken || null,
    documents,
  }
}

export async function getUsersByCompanyId(
  companyId: string,
  { queryStringParameters }: Config,
): Promise<Pagination<Partial<UserDocument>>> {
  const { query, lastKey, orderBy } = queryStringParameters
  const hasQuery = query && Object.keys(query).length > 0
  const orderByAttr = orderBy[0].replace('-', '')
  const isDescending = orderBy[0].startsWith('-')
  const uniqueSortKeys = ['email']
  const indexSuffix = uniqueSortKeys.includes(orderByAttr) ? '' : 'SortKey'
  const partitionKey = 'companyId'
  const sortKey = `${orderByAttr}${indexSuffix}`
  const IndexName = `${partitionKey}-${sortKey}`

  if (hasQuery) {
    const minDocsQuantity = 10
    let filteredDocuments: Partial<UserDocument>[] = []
    let lastResultKey = lastKey
    let requiresLoadMore = false
    let readConsumedCapacity = 0

    do {
      const result = await queryDynamoDBDocuments<UserDocument>({
        name: 'any',
        params: {
          TableName: process.env.USERS_TABLE_NAME,
          IndexName,
          Limit: null,
          ProjectionExpression: `
            #companyId,
            #id,
            #nameSortKey,

            #name,
            #email,
            #status
          `,
          ExclusiveStartKey: lastResultKey,
          ExpressionAttributeNames: {
            '#companyId': 'companyId',
            '#id': 'id',
            '#nameSortKey': 'nameSortKey',

            '#email': 'email',
            '#name': 'name',
            '#status': 'status',
          },
          ExpressionAttributeValues: {
            ':companyId': companyId,
          },
          KeyConditionExpression: '#companyId = :companyId',
          ScanIndexForward: !isDescending,
        },
      })

      const { docs, lastKey } = filterDocsByQuery({
        docs: result.documents,
        partitionKey,
        sortKey,
        sortKeys: ['name'],
        fields: ['id', 'name', 'email', 'status'],
        query,
        limit: minDocsQuantity,
      })

      filteredDocuments = filteredDocuments.concat(docs)
      readConsumedCapacity += result.readConsumedCapacity
      lastResultKey = lastKey || result.lastKey
      requiresLoadMore = lastResultKey && filteredDocuments.length < minDocsQuantity
    } while (requiresLoadMore)

    return {
      readConsumedCapacity,
      lastKey: lastResultKey || null,
      documents: filteredDocuments,
    }
  }

  const result = await queryDynamoDBDocuments<UserDocument>({
    name: 'any',
    params: {
      TableName: process.env.USERS_TABLE_NAME,
      IndexName,
      ProjectionExpression: `
        #companyId,
        #id,
        #nameSortKey,

        #name,
        #email,
        #status
      `,
      ExclusiveStartKey: lastKey,
      ExpressionAttributeNames: {
        '#companyId': 'companyId',
        '#id': 'id',
        '#nameSortKey': 'nameSortKey',

        '#email': 'email',
        '#name': 'name',
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':companyId': companyId,
      },
      KeyConditionExpression: '#companyId = :companyId',
      ScanIndexForward: !isDescending,
    },
  })

  return {
    readConsumedCapacity: result.readConsumedCapacity || null,
    lastKey: result.lastKey || null,
    documents: result.documents,
  }
}
