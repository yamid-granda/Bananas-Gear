import { AssetsTableIndex } from '../configs'

export const AssetsTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.AssetsTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'assetId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'companyId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'nameSortKey',
        AttributeType: 'S',
      },
    ],

    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],

    GlobalSecondaryIndexes: [
      {
        IndexName: AssetsTableIndex.ASSET_ID,
        KeySchema: [
          {
            AttributeName: 'assetId',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },

      {
        IndexName: AssetsTableIndex.COMPANY_ID__NAME_SORT_KEY,
        KeySchema: [
          {
            AttributeName: 'companyId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'nameSortKey',
            KeyType: 'RANGE',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
  },
}
