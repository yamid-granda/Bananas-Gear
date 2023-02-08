import type { APIGatewayProxyResult } from 'aws-lambda'
import { getTotalTableDocuments } from 'utils/db/counts/getTotalTableDocuments.db'
import type { ValidatedEventAPIGatewayProxyEvent } from 'utils/apiGateway.util'
import { middyfy } from 'utils/lambda.util'
import { BadRequestError } from 'http-errors-enhanced'
import type { CompanyCount, CompanyCountsDic } from '../../interfaces'
import { COMPANY_COUNTS } from '../../config'

interface PathParameters {
  companyId: string
}

interface QueryStringParameters {
  modules?: string
}

const tableNames: Record<CompanyCount, string> = {
  users: `${process.env.USERS_TABLE_NAME}`,
}

const handler: ValidatedEventAPIGatewayProxyEvent<any, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { pathParameters, queryStringParameters } = event
  const { companyId } = pathParameters
  const { modules: modulesStrParam } = queryStringParameters as QueryStringParameters

  if (!modulesStrParam)
    throw new BadRequestError('modules param is required')

  let modules: string[] = []

  if (modulesStrParam) {
    modules = modulesStrParam
      .split(',')
      .filter(module => COMPANY_COUNTS.includes(module))
  }

  const promises: Promise<number>[] = modules.map((module: CompanyCount) => getTotalTableDocuments({
    tableName: tableNames[module],
    countsTableSuffix: companyId,
  }))

  const promiseResponses = await Promise.all(promises)

  const response: CompanyCountsDic = modules.reduce((res, module: CompanyCount, index) => {
    res[module] = promiseResponses[index]
    return res
  }, { users: null })

  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  }
}

export const main = middyfy(handler)
