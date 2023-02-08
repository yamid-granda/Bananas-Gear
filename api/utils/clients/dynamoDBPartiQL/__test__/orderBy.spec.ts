import { describe, expect, it } from 'vitest'
import { formatSql, getPartyQLStatement } from '..'

describe.concurrent('DynamoDB PartiQL, ORDER BY', () => {
  it('add ORDER BY', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['-name'],
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
      ORDER BY nameSortKey DESC
    `))
  })

  it('ORDER BY as unique sort key', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      uniqueSortKeys: ['email'],
      queryStringParameters: {
        orderBy: ['-email'],
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-email"
      WHERE companyId = 'the-company-id'
      ORDER BY email DESC
    `))
  })
})
