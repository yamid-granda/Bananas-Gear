export const UsersTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.UsersTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'companyId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'nameSortKey',
        AttributeType: 'S',
      },
      {
        AttributeName: 'email',
        AttributeType: 'S',
      },
      {
        AttributeName: 'status',
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
        IndexName: 'email',
        KeySchema: [
          {
            AttributeName: 'email',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
      {
        IndexName: 'companyId-email',
        KeySchema: [
          {
            AttributeName: 'companyId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'email',
            KeyType: 'RANGE',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
      {
        IndexName: 'companyId-nameSortKey',
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
      {
        IndexName: 'companyId-status',
        KeySchema: [
          {
            AttributeName: 'companyId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'status',
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
