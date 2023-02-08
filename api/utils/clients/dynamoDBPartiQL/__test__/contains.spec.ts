import { describe, expect, it } from 'vitest'
import { formatSql, getPartyQLStatement } from '../'

describe.concurrent('DynamoDB PartiQL, CONTAINS instruction', () => {
  it('filter', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: 'hello',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'hello')
        )
    `))
  })

  it('filter with extra fields', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: 'hello',
          },
          status: {
            contains: 'pending',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'hello')
          AND CONTAINS("status", 'pending')
        )
    `))
  })

  it('filter as array', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: ['Search Text', 'world'],
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'search text')
          AND CONTAINS("nameLowerCase", 'world')
        )
    `))
  })

  it('filter multiple attributes as array', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: ['Search Text', 'world'],
          },
          email: {
            contains: ['yahoo', 'gmail'],
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'search text')
          AND CONTAINS("nameLowerCase", 'world')
          AND CONTAINS("emailLowerCase", 'yahoo')
          AND CONTAINS("emailLowerCase", 'gmail')
        )
    `))
  })

  it('different attribute filter', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          email: {
            contains: 'hello',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'hello')
        )
    `))
  })

  it('multiple attribute filter', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: 'hello',
          },
          email: {
            contains: 'world',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'hello')
          AND CONTAINS("emailLowerCase", 'world')
        )
    `))
  })

  it('long and uppercase text', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          email: {
            contains: 'This is a Very LONG text',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'this is a very long text')
        )
    `))
  })

  it('OR condition', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: 'search param',
          },
          email: {
            contains: {
              condition: 'OR',
              value: 'This is a Very LONG text',
            },
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'search param')
          OR CONTAINS("emailLowerCase", 'this is a very long text')
        )
    `))
  })

  it('not allows OR condition in the first attribute', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          email: {
            contains: {
              condition: 'OR',
              value: 'This is a Very LONG text',
            },
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'this is a very long text')
        )
    `))
  })

  it('AND condition', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          email: {
            contains: {
              condition: 'AND',
              value: 'This is a Very LONG text',
            },
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'this is a very long text')
        )
    `))
  })

  it('OR condition with multiple values', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          email: {
            contains: {
              condition: 'OR',
              value: ['value A', 'value B'],
            },
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'value a')
          OR CONTAINS("emailLowerCase", 'value b')
        )
    `))
  })

  it('unique sort keys', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      uniqueSortKeys: ['email'],
      queryStringParameters: {
        orderBy: ['email'],
        query: {
          email: {
            contains: 'email-provider',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-email"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'email-provider')
        )
    `))
  })

  it('descending sort', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      uniqueSortKeys: ['email'],
      queryStringParameters: {
        orderBy: ['-email'],
        query: {
          email: {
            contains: 'yahoo',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-email"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("emailLowerCase", 'yahoo')
        )
      ORDER BY email DESC
    `))
  })

  it('filter with equals', async () => {
    const statement = getPartyQLStatement({
      sortKeys: ['name', 'email'],
      tableName: 'GF-Users-test',
      partitionKey: 'companyId',
      partitionKeyValue: 'the-company-id',
      queryStringParameters: {
        orderBy: ['name'],
        query: {
          name: {
            contains: 'hello',
          },
          status: {
            eq: 'active',
          },
        },
      },
    })

    expect(statement).toBe(formatSql(`
      SELECT *
      FROM "GF-Users-test"."companyId-nameSortKey"
      WHERE companyId = 'the-company-id'
        AND (
          CONTAINS("nameLowerCase", 'hello')
          AND status = 'active'
        )
    `))
  })
})
