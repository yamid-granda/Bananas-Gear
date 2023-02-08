import type { Filter, InstructionKey, InstructionValue, InstructionValueConfig, QueryStringParameters } from '../../../shared/http/interfaces/QueryStringParameters'

export type FilterActionsDic = Record<keyof Filter, (config: SqlGeneratorConfig) => string>

interface SqlGeneratorConfig {
  attr: string
  value: string
  sortKeys: string[]
}

const sqlGeneratorsDic: FilterActionsDic = {
  contains: (config: SqlGeneratorConfig) => {
    const { attr, value, sortKeys } = config
    let attrSuffix = ''

    if (sortKeys.includes(attr))
      attrSuffix = 'LowerCase'

    return `CONTAINS("${attr}${attrSuffix}", '${value.toLowerCase()}')`
  },

  eq: (config: SqlGeneratorConfig) => `${config.attr} = '${config.value}'`,
  ne: (config: SqlGeneratorConfig) => `${config.value}`,
  lte: (config: SqlGeneratorConfig) => `${config.value}`,
  lt: (config: SqlGeneratorConfig) => `${config.value}`,
  gte: (config: SqlGeneratorConfig) => `${config.value}`,
  gt: (config: SqlGeneratorConfig) => `${config.value}`,
  between: (config: SqlGeneratorConfig) => `${config.value}`,
  exist: (config: SqlGeneratorConfig) => `${config.value}`,
  notExist: (config: SqlGeneratorConfig) => `${config.value}`,
  notContains: (config: SqlGeneratorConfig) => `${config.value}`,
  beginsWith: (config: SqlGeneratorConfig) => `${config.value}`,
}

interface GetPartyQLStatementFromQueryConfig {
  tableName: string
  partitionKey: string
  sortKeys: string[]
  partitionKeyValue: string
  queryStringParameters: QueryStringParameters
  uniqueSortKeys?: string[]
}

export function getPartyQLStatement(config: GetPartyQLStatementFromQueryConfig): string {
  const {
    tableName,
    partitionKey,
    partitionKeyValue,
    queryStringParameters,
    uniqueSortKeys = [],
    sortKeys = [],
  } = config

  const {
    query = {},
    fields = [],
    orderBy = [],
  } = queryStringParameters || {}

  const sqlFields = getSqlFields(fields)
  const hasQuery = Boolean(Object.keys(query).length)

  let sqlFilter = ''

  Object.entries(query).forEach(([attribute, filtersDic], attributeIndex) => {
    const isFirstAttribute = !attributeIndex
    let condition = ''

    if (!isFirstAttribute)
      condition = ' AND'

    Object.entries(filtersDic).forEach(([instructionKey, instructionValue]: [InstructionKey, InstructionValue]) => {
      const sqlGenerator = sqlGeneratorsDic[instructionKey]
      const isInstructionValueArray = Array.isArray(instructionValue)

      if (isInstructionValueArray) {
        sqlFilter += getSqlFilterFromArrayValue({
          attr: attribute,
          condition,
          instructionValue,
          isFirstAttribute,
          sortKeys,
          sqlGenerator,
        })

        return
      }

      const isInstructionValueObject = typeof instructionValue === 'object'

      if (isInstructionValueObject) {
        sqlFilter += getSqlFilterFromObjectValue({
          attr: attribute,
          condition: instructionValue.condition,
          instructionValue,
          isFirstAttribute,
          sortKeys,
          sqlGenerator,
        })

        return
      }

      sqlFilter += ` ${condition} ${sqlGenerator({
        attr: attribute,
        value: instructionValue,
        sortKeys,
      })}`
    })
  })

  let sqlFilterCondition = ''

  if (hasQuery)
    sqlFilterCondition = `AND ( ${sqlFilter} )`

  const sortKeyAttr = orderBy[0].replace('-', '')
  let sortKey = `${sortKeyAttr}SortKey`

  if (uniqueSortKeys.includes(sortKeyAttr))
    sortKey = sortKey.replace('SortKey', '')

  let sqlOrderBy = ''

  if (orderBy[0] && orderBy[0][0] === '-')
    sqlOrderBy = `ORDER BY ${sortKey} DESC`

  const statement = `
    SELECT ${sqlFields}
    FROM "${tableName}"."${partitionKey}-${sortKey}"
    WHERE ${partitionKey} = '${partitionKeyValue}'
    ${sqlFilterCondition}
    ${sqlOrderBy}
  `

  return formatSql(statement)
}

function getSqlFields(fields: string[] = []): string {
  let sqlFields = '*'

  if (fields.length)
    sqlFields = fields.join(', ')

  return sqlFields
}

interface GetSqlFilterFromObjectValue {
  attr: string
  condition: string
  isFirstAttribute: boolean
  sortKeys: string[]
  sqlGenerator: (config: SqlGeneratorConfig) => string
}

interface GetSqlFilterFromArrayValueConfig extends GetSqlFilterFromObjectValue {
  instructionValue: string[]
}

function getSqlFilterFromArrayValue({
  attr,
  condition,
  instructionValue,
  sqlGenerator,
  isFirstAttribute,
  sortKeys,
}: GetSqlFilterFromArrayValueConfig): string {
  let sqlFilter = ''

  instructionValue.forEach((value, valueIndex) => {
    const isFirstValue = !valueIndex
    const isFirstConditional = isFirstValue && isFirstAttribute
    condition = isFirstConditional ? '' : ' AND'
    sqlFilter += ` ${condition} ${sqlGenerator({ value, attr, sortKeys })}`
  })

  return sqlFilter
}

interface GetSqlFilterFromObjectValueConfig extends GetSqlFilterFromObjectValue {
  instructionValue: InstructionValueConfig
}

function getSqlFilterFromObjectValue({
  attr: attribute,
  condition,
  instructionValue,
  sqlGenerator,
  isFirstAttribute,
  sortKeys,
}: GetSqlFilterFromObjectValueConfig): string {
  if (typeof instructionValue.value === 'string') {
    condition = isFirstAttribute ? '' : ` ${instructionValue.condition}`
    return ` ${condition} ${sqlGenerator({
      attr: attribute,
      value: instructionValue.value,
      sortKeys,
    })}`
  }

  let sqlFilter = ''

  if (Array.isArray(instructionValue.value)) {
    instructionValue.value.forEach((value, valueIndex) => {
      const isFirstValue = !valueIndex
      const isFirstConditional = isFirstValue && isFirstAttribute
      condition = isFirstConditional ? '' : ` ${instructionValue.condition}`
      sqlFilter += ` ${condition} ${sqlGenerator({
        attr: attribute,
        value,
        sortKeys,
      })}`
    })
  }

  return sqlFilter
}

export function formatSql(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}
