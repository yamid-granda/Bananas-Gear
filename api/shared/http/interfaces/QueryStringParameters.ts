interface BaseIndexQuery {
  index: string
  isDescending?: boolean
}
interface DefaultIndexQuery extends BaseIndexQuery {
  type: 'eq' | 'lte' | 'lt' | 'gte' | 'gt' | 'beginsWith'
  value: string
}
interface BetweenIndexQuery extends BaseIndexQuery {
  type: 'between'
  value: [string, string]
}
export type DynamoDBIndexQuery = DefaultIndexQuery | BetweenIndexQuery

interface DBFilter {
  eq?: string
  ne?: string
  lte?: string
  lt?: string
  gte?: string
  gt?: string
  between?: [string, string]
  exists?: boolean
  notExists?: boolean
  contains?: string
  notContains?: string
  beginsWith?: string
}
export type DynamoDBFilter = Record<string, DBFilter>

export interface QueryStringParametersOld {
  query?: DynamoDBIndexQuery
  filter?: DynamoDBFilter
  limit?: number
  fields?: string[]
  lastKey?: any
}

export interface Filter {
  eq?: string
  ne?: string
  lte?: string
  lt?: string
  gte?: string
  gt?: string
  between?: [string, string]
  exist?: boolean
  notExist?: boolean
  contains?: string
  notContains?: string
  beginsWith?: string
}

export type InstructionKey = keyof Filter
export type InstructionValueValue = string | string[]

export interface InstructionValueConfig {
  value: InstructionValue
  condition: 'OR' | 'AND'
}

export type InstructionValue = InstructionValueValue | InstructionValueConfig
export type FilterDic = Record<InstructionKey, InstructionValueValue | InstructionValueConfig>
export type AttributeName = string
export type HttpQuery = Record<AttributeName, FilterDic>

export interface QueryStringParameters<SortableAttrs = string[]> {
  orderBy: SortableAttrs
  query?: HttpQuery
  lastKey?: any
  limit?: number
  fields?: string[]
}

export interface FlatQueryStringParameters {
  query?: string
  orderBy?: string
  filter?: string
  limit?: string
  fields?: string
  lastKey?: string
}
