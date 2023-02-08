import { describe, expect, it } from 'vitest'
import { formatSql, getPartyQLStatement } from '../'

describe.concurrent('DynamoDB PartiQL, fields to SELECT', () => {
  it('not contains fields', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
    `))
  })

  it('unique field', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        fields: ['name'],
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT name
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
    `))
  })

  it('multiple fields', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        fields: ['name', 'email'],
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT name, email
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
    `))
  })

  it('unique field and contains', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        fields: ['email'],
        query: {
          name: {
            contains: 'hello',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT email
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'hello')
        )
    `))
  })

  it('multiple fields and contains', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        fields: ['email', 'name'],
        query: {
          name: {
            contains: 'hello',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT email, name
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'hello')
        )
    `))
  })
})
