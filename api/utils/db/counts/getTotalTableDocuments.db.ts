import { getDynamoDBDocument } from '../../clients/dynamoDB/getDynamoDBDocument'

interface GetTotalTableDocuments {
  tableName: string
  countsTableSuffix?: string
}

interface CountDocument {
  type: string
  count: number
}

export async function getTotalTableDocuments({
  tableName,
  countsTableSuffix,
}: GetTotalTableDocuments): Promise<number> {
  const type = countsTableSuffix ? `${tableName}-${countsTableSuffix}` : tableName
  const response = await getDynamoDBDocument({
    name: 'getTotalTableDocuments',
    params: {
      TableName: `${process.env.countsTable}`,
      Key: { type },
    },
  })

  let total = 0

  if (response.Item) {
    const document = response.Item as CountDocument
    total = document.count
  }

  return total
}
