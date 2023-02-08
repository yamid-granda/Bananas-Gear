export interface Pagination<Document> {
  lastKey: unknown | null
  perPage?: number | null
  documents: Document[]
  count?: number | null
  total?: number
  readConsumedCapacity?: any
}
