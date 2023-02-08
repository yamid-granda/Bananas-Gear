import type { FlatQueryStringParameters, QueryStringParameters } from '@/api/shared/http/interfaces'

export function parseQueryStringParams(stringQueryParams: FlatQueryStringParameters = {}): QueryStringParameters {
  const { lastKey, query, fields, limit, orderBy } = stringQueryParams
  const sortableAttrs = ['name', 'email']

  const queryStringParameters: QueryStringParameters = { orderBy: ['name'] }

  if (orderBy) {
    const allAttrs = orderBy.split(',')
    const allowedAttrs = allAttrs
      .filter((attr) => {
        const attrName = attr.replace('-', '')
        return sortableAttrs.includes(attrName)
      })

    if (allowedAttrs.length)
      queryStringParameters.orderBy = allowedAttrs
  }

  if (query)
    queryStringParameters.query = JSON.parse(query)

  if (lastKey)
    queryStringParameters.lastKey = JSON.parse(lastKey)

  if (fields)
    queryStringParameters.fields = fields.split(',')

  if (limit)
    queryStringParameters.limit = parseInt(limit, 10)

  return queryStringParameters
}
