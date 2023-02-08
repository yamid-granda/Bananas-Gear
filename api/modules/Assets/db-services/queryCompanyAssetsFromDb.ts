import type { AssetDoc } from '../types'
import type { QueryStringParameters } from '@/api/shared/http/interfaces'
import type { Pagination } from '@/api/utils'
import { queryDynamoDBDocuments } from '@/api/utils'
import { filterDocsByQuery } from '@/api/utils/httpFilter'

interface Config {
  queryStringParameters?: QueryStringParameters
}

export async function queryCompanyAssetsFromDb(
  companyId: string,
  { queryStringParameters }: Config,
): Promise<Pagination<Partial<AssetDoc>>> {
  const { query, lastKey, orderBy } = queryStringParameters
  const hasQuery = query && Object.keys(query).length > 0
  const orderByAttr = orderBy[0].replace('-', '')
  const isDescending = orderBy[0].startsWith('-')
  // const uniqueSortKeys = ['email']
  // const indexSuffix = uniqueSortKeys.includes(orderByAttr) ? '' : 'SortKey'
  const indexSuffix = 'SortKey'
  const partitionKey = 'companyId'
  const sortKey = `${orderByAttr}${indexSuffix}`
  const IndexName = `${partitionKey}-${sortKey}`

  const params = {
    TableName: process.env.ASSETS_TABLE_NAME,
    IndexName,
    ProjectionExpression: `
      #assetId,
      #createdAt,
      #createdBy,
      #id,
      #name,
      #nameSortKey,
      #status
    `,
    ExpressionAttributeNames: {
      '#assetId': 'assetId',
      '#companyId': 'companyId',
      '#createdAt': 'createdAt',
      '#createdBy': 'createdBy',
      '#id': 'id',
      '#name': 'name',
      '#nameSortKey': 'nameSortKey',
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':companyId': companyId,
    },
    KeyConditionExpression: '#companyId = :companyId',
    ScanIndexForward: !isDescending,
  }

  if (hasQuery) {
    const minDocsQuantity = 10
    let filteredDocuments: Partial<AssetDoc>[] = []
    let lastResultKey = lastKey
    let requiresLoadMore = false
    let readConsumedCapacity = 0

    do {
      const result = await queryDynamoDBDocuments<AssetDoc>({
        name: 'QUERY_COMPANY_ASSETS',
        params: {
          Limit: null,
          ExclusiveStartKey: lastResultKey,
          ...params,
        },
      })

      const { docs, lastKey } = filterDocsByQuery({
        docs: result.documents,
        partitionKey,
        sortKey,
        sortKeys: ['name'],
        fields: [
          'createdAt',
          'createdBy',
          'email',
          'id',
          'name',
          'status',
        ],
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

  const result = await queryDynamoDBDocuments<AssetDoc>({
    name: 'QUERY_COMPANY_ASSETS',
    params: {
      ...params,
      ExclusiveStartKey: lastKey,
    },
  })

  return {
    readConsumedCapacity: result.readConsumedCapacity || null,
    lastKey: result.lastKey || null,
    documents: result.documents,
  }
}
