import type { FilterDic, HttpQuery } from 'shared/http/interfaces'

interface FilterDocumentsByQueryConfig {
  docs: Array<any>
  query: HttpQuery
  fields?: string[]
  partitionKey: string
  sortKey: string
  sortKeys: string[]
  limit?: number
}

interface FilterDocumentsByQueryRes {
  docs: Array<any>
  lastKey: any
}

export function filterDocsByQuery(config: FilterDocumentsByQueryConfig): FilterDocumentsByQueryRes {
  const {
    docs,
    query,
    fields,
    sortKeys,
    partitionKey,
    sortKey,
    limit = 10,
  } = config

  const filteredDocs = []
  let lastKey = null

  for (const doc of docs) {
    const isMatchedDoc = isDocInQuery({ doc, query, sortKeys })

    if (isMatchedDoc) {
      const docToAdd = getDocToAdd(doc, fields)
      filteredDocs.push(docToAdd)
    }

    if (filteredDocs.length >= limit) {
      lastKey = {
        id: doc.id,
        [partitionKey]: doc[partitionKey],
        [sortKey]: doc[sortKey],
      }

      break
    }
  }

  return {
    docs: filteredDocs,
    lastKey,
  }
}

interface IsDocInQueryConfig {
  doc: any
  query: HttpQuery
  sortKeys: string[]
}

function isDocInQuery(config: IsDocInQueryConfig): boolean {
  const { doc, query, sortKeys } = config
  let isMatchedDoc = false

  for (const [attr, filterConfig] of Object.entries(query)) {
    const attrName = getAttrSortKey({ attr, sortKeys })
    const attrValue = doc[attrName]

    if (attrValue === undefined)
      break

    isMatchedDoc = isAttrInFilter(attrValue, filterConfig)

    if (!isMatchedDoc)
      break
  }

  return isMatchedDoc
}

interface GetAttrSortKeyConfig {
  attr: string
  sortKeys: string[]
}

export function getAttrSortKey(config: GetAttrSortKeyConfig): string {
  const { attr, sortKeys } = config

  if (sortKeys.includes(attr))
    return `${attr}SortKey`

  return attr
}

function isAttrInFilter(attrValue: string, filterConfig: FilterDic): boolean {
  let isDocInFilter = false

  for (const [filterType, filterValue] of Object.entries(filterConfig)) {
    if (filterType === 'contains') {
      isDocInFilter = attrValue.includes(`${filterValue}`.toLowerCase())

      if (!isDocInFilter)
        break
    }
  }

  return isDocInFilter
}

function getDocToAdd(doc: any, fields: string[]): object {
  let docToAdd: any = {}

  if (fields) {
    for (const field of fields)
      docToAdd[field] = doc[field]
  }
  else {
    docToAdd = doc
  }

  return docToAdd
}
