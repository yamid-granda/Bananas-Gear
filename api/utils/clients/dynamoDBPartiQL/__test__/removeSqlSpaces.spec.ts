import { describe, expect, it } from 'vitest'
import { formatSql } from '../'

describe.concurrent('removeSpaces method', () => {
  it('remove spaces', async () => {
    const sql = `
      SELECT *
      FROM "GF-Users-test"."id-nameSortKey"
      WHERE companyId = "the-company-id"
    `

    const sqlNoSpaces = formatSql(sql)

    expect(sqlNoSpaces).toBe('SELECT * FROM "GF-Users-test"."id-nameSortKey" WHERE companyId = "the-company-id"')
  })
})
