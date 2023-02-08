import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InternalServerError } from 'http-errors-enhanced'
import type { Pagination } from '../../../utils/sharedUtils/interfaces/shared/Pagination.interface'
import { createDBClient } from './dynamoDB.client'

interface QueryDocumentsFromDynamoDB {
  name: string
  params: DocumentClient.QueryInput
  countsTableSuffix?: string
}

const DEFAULT_LIMIT = 100

export async function queryDynamoDBDocuments<T = any>({
  params,
}: QueryDocumentsFromDynamoDB): Promise<Pagination<T>> {
  const perPage = params.Limit === null ? null : DEFAULT_LIMIT

  const dbClient = createDBClient()

  let queryOutput: DocumentClient.QueryOutput

  const queryOutputPromise = dbClient
    .query({
      ScanIndexForward: false,
      Limit: perPage,
      ...params,
      TableName: `${params.TableName}`,
      ReturnConsumedCapacity: 'TOTAL',
    })
    .promise()
    .then((response) => {
      queryOutput = response
      // console.log('the per page limit', perPage)
      // console.log('consumed', queryOutput.ConsumedCapacity)
      return response
    })
    .catch((error: Error) => {
      console.error('ERROR', error.message)
      throw new InternalServerError(`Database: ${error.message}`)
    })

  // let total = 0
  // const totalPromise = getTotalTableDocuments({
  //   tableName: params.TableName,
  //   countsTableSuffix,
  // })
  //   .then((response) => {
  //     total = response
  //     return response
  //   })
  //   .catch((error: Error) => {
  //     console.error('ERROR', error.message)
  //     throw new InternalServerError(`Database: ${error.message}`)
  //   })

  await Promise.all([queryOutputPromise])

  return {
    perPage,
    count: queryOutput?.Count ?? null,
    lastKey: queryOutput.LastEvaluatedKey ?? null,
    documents: (queryOutput.Items || []) as T[],
    readConsumedCapacity: queryOutput.ConsumedCapacity.CapacityUnits,
  }
}
