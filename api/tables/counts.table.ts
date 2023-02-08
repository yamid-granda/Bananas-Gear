export const countsTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.countsTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'type',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'type',
        KeyType: 'HASH',
      },
    ],
  },
}
