import { describe, expect, it } from 'vitest'
import { filterDocsByQuery } from '../'

const docs = [
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'aaliyah skiles',
    email: 'corine34@hotmail.com',
    id: 'l6vpkb46ktvjo3h6lika',
    name: 'Aaliyah Skiles',
  },
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'aaliyah skiles',
    email: 'corine34@gmail.com',
    id: 'l6vpkb46ktvjo3h6lika',
    name: 'Aaliyah Room',
  },
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'aaron rippin58',
    email: 'baby_batz66@yahoo.com',
    id: 'l6vpkp8w8uqp3vr5yile',
    name: 'Aaron Rippin58',
  },
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'abbey28',
    email: 'darryl.fritsch35@hotmail.com',
    id: 'l6vpkzgsxn4k2iuat54o',
    name: 'Abbey28',
  },
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'abbey brown21',
    email: 'kyleigh.willms56@gmail.com',
    id: 'l6vpl8iu13cnd2vxrix6',
    name: 'Abbey Brown21',
  },
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'abbie86',
    email: 'santiago_zieme10@hotmail.com',
    id: 'l6vpl1f6dzpry1xrx1ju',
    name: 'Abbie86',
  },
  {
    companyId: 'l6vp92vay5k81hznrlsi',
    status: 'pending',
    nameSortKey: 'abbigail muller',
    email: 'shayna75@yahoo.com',
    id: 'l6vpkvnn35nn35djhm4z',
    name: 'Abbigail Muller',
  },
]

describe.concurrent('http query filter, contains statement', () => {
  it('contains a attribute', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      query: {
        name: {
          contains: 'bb',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          companyId: 'l6vp92vay5k81hznrlsi',
          status: 'pending',
          nameSortKey: 'abbey28',
          email: 'darryl.fritsch35@hotmail.com',
          id: 'l6vpkzgsxn4k2iuat54o',
          name: 'Abbey28',
        },
        {
          companyId: 'l6vp92vay5k81hznrlsi',
          status: 'pending',
          nameSortKey: 'abbey brown21',
          email: 'kyleigh.willms56@gmail.com',
          id: 'l6vpl8iu13cnd2vxrix6',
          name: 'Abbey Brown21',
        },
        {
          companyId: 'l6vp92vay5k81hznrlsi',
          status: 'pending',
          nameSortKey: 'abbie86',
          email: 'santiago_zieme10@hotmail.com',
          id: 'l6vpl1f6dzpry1xrx1ju',
          name: 'Abbie86',
        },
        {
          companyId: 'l6vp92vay5k81hznrlsi',
          status: 'pending',
          nameSortKey: 'abbigail muller',
          email: 'shayna75@yahoo.com',
          id: 'l6vpkvnn35nn35djhm4z',
          name: 'Abbigail Muller',
        },
      ],
      lastKey: null,
    })
  })

  it('contains two attributes', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      query: {
        name: {
          contains: 'bb',
        },
        email: {
          contains: 'hotmail',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          companyId: 'l6vp92vay5k81hznrlsi',
          status: 'pending',
          nameSortKey: 'abbey28',
          email: 'darryl.fritsch35@hotmail.com',
          id: 'l6vpkzgsxn4k2iuat54o',
          name: 'Abbey28',
        },
        {
          companyId: 'l6vp92vay5k81hznrlsi',
          status: 'pending',
          nameSortKey: 'abbie86',
          email: 'santiago_zieme10@hotmail.com',
          id: 'l6vpl1f6dzpry1xrx1ju',
          name: 'Abbie86',
        },
      ],
      lastKey: null,
    })
  })

  it('contains a attribute with specific attributes', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      fields: ['name'],
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      query: {
        name: {
          contains: 'bb',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          name: 'Abbey28',
        },
        {
          name: 'Abbey Brown21',
        },
        {
          name: 'Abbie86',
        },
        {
          name: 'Abbigail Muller',
        },
      ],
      lastKey: null,
    })
  })

  it('contains two attributes with specific fields', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      fields: ['name', 'email', 'status', 'id'],
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      query: {
        name: {
          contains: 'bb',
        },
        email: {
          contains: 'hotmail',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          status: 'pending',
          email: 'darryl.fritsch35@hotmail.com',
          id: 'l6vpkzgsxn4k2iuat54o',
          name: 'Abbey28',
        },
        {
          status: 'pending',
          email: 'santiago_zieme10@hotmail.com',
          id: 'l6vpl1f6dzpry1xrx1ju',
          name: 'Abbie86',
        },
      ],
      lastKey: null,
    })
  })

  it('last key value on limit 1', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      fields: ['name', 'email', 'status', 'id'],
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      limit: 1,
      query: {
        name: {
          contains: 'bb',
        },
        email: {
          contains: 'hotmail',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          status: 'pending',
          email: 'darryl.fritsch35@hotmail.com',
          id: 'l6vpkzgsxn4k2iuat54o',
          name: 'Abbey28',
        },
      ],
      lastKey: {
        companyId: 'l6vp92vay5k81hznrlsi',
        id: 'l6vpkzgsxn4k2iuat54o',
        nameSortKey: 'abbey28',
      },
    })
  })

  it('last key value on limit 3', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      fields: ['name', 'email', 'status', 'id'],
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      limit: 3,
      query: {
        name: {
          contains: 'e',
        },
        email: {
          contains: 'hotmail',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          name: 'Aaliyah Skiles',
          email: 'corine34@hotmail.com',
          status: 'pending',
          id: 'l6vpkb46ktvjo3h6lika',
        },
        {
          name: 'Abbey28',
          email: 'darryl.fritsch35@hotmail.com',
          status: 'pending',
          id: 'l6vpkzgsxn4k2iuat54o',
        },
        {
          name: 'Abbie86',
          email: 'santiago_zieme10@hotmail.com',
          status: 'pending',
          id: 'l6vpl1f6dzpry1xrx1ju',
        },
      ],
      lastKey: {
        companyId: 'l6vp92vay5k81hznrlsi',
        nameSortKey: 'abbie86',
        id: 'l6vpl1f6dzpry1xrx1ju',
      },
    })
  })
  it('last key value with different partition key', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      fields: ['name', 'email', 'status', 'id'],
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'email',
      limit: 2,
      query: {
        name: {
          contains: 'e',
        },
        email: {
          contains: 'hotmail',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          name: 'Aaliyah Skiles',
          email: 'corine34@hotmail.com',
          status: 'pending',
          id: 'l6vpkb46ktvjo3h6lika',
        },
        {
          name: 'Abbey28',
          email: 'darryl.fritsch35@hotmail.com',
          status: 'pending',
          id: 'l6vpkzgsxn4k2iuat54o',
        },
      ],
      lastKey: {
        companyId: 'l6vp92vay5k81hznrlsi',
        id: 'l6vpkzgsxn4k2iuat54o',
        email: 'darryl.fritsch35@hotmail.com',
      },
    })
  })

  it('finds on uppercase query', async () => {
    const filteredDocs = filterDocsByQuery({
      docs,
      fields: ['name', 'email', 'status', 'id'],
      sortKeys: ['name'],
      partitionKey: 'companyId',
      sortKey: 'nameSortKey',
      limit: 3,
      query: {
        name: {
          contains: 'e',
        },
        email: {
          contains: 'hoTmail',
        },
      },
    })

    expect(filteredDocs).toEqual({
      docs: [
        {
          name: 'Aaliyah Skiles',
          email: 'corine34@hotmail.com',
          status: 'pending',
          id: 'l6vpkb46ktvjo3h6lika',
        },
        {
          name: 'Abbey28',
          email: 'darryl.fritsch35@hotmail.com',
          status: 'pending',
          id: 'l6vpkzgsxn4k2iuat54o',
        },
        {
          name: 'Abbie86',
          email: 'santiago_zieme10@hotmail.com',
          status: 'pending',
          id: 'l6vpl1f6dzpry1xrx1ju',
        },
      ],
      lastKey: {
        companyId: 'l6vp92vay5k81hznrlsi',
        nameSortKey: 'abbie86',
        id: 'l6vpl1f6dzpry1xrx1ju',
      },
    })
  })
})
