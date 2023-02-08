export const VisitsTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.VisitsTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'type',
        AttributeType: 'S',
      },
      {
        AttributeName: 'date',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'type',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'date',
        KeyType: 'RANGE',
      },
    ],
  },
}
