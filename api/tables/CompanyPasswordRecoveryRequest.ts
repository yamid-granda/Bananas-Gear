export const CompanyPasswordRecoveryRequestsTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.CompanyPasswordRecoveryRequestsTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
  },
}
