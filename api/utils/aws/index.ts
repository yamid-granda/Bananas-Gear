import type { AWS } from '@serverless/typescript'

type DynamoDbAction =
  | 'DeleteItem'
  | 'DescribeTable'
  | 'GetItem'
  | 'PutItem'
  | 'Query'
  | 'Scan'
  | 'UpdateItem'
  | 'PartiQLSelect'
  | 'PartiQLInsert'
  | 'PartiQLUpdate'
  | 'PartiQLDelete'

interface Permission {
  actions: string[]
}

interface DynamoDbPermission extends Permission {
  table: string
  actions: DynamoDbAction[]
  index?: string
}

interface SesPermission extends Permission {
  email: string
}

interface LambdaPermission extends Permission {
  name: string
}

interface ExecuteApiPermission extends Permission {
  resource: string
}

export interface AWSPermissionConfig {
  ['dynamodb']?: DynamoDbPermission[]
  ['ses']?: SesPermission[]
  ['lambda']?: LambdaPermission[]
  ['executeApi']?: ExecuteApiPermission[]
}

const defaultLambdaConfig: AWSPermissionConfig = {
  lambda: [
    {
      name: 'sendWebSocketMessage',
      actions: ['InvokeFunction'],
    },
  ],
}

function actionsRequiresDefaultLambdaConfig(actions: DynamoDbAction[]): boolean {
  return actions.some(action => ['PutItem', 'UpdateItem', 'DeleteItem'].includes(action))
}

export function mapRoleStatements({
  dynamodb = [],
  ses = [],
  lambda = [],
  executeApi = [],
}: AWSPermissionConfig) {
  let statements: any = []

  dynamodb.forEach(({ actions, table, index }) => {
    const Action = actions.map(action => `dynamodb:${action}`)

    const Resource = index
      ? { 'Fn::Join': ['/', [`\${self:custom.${table}Table.arn}`, `index/${index}`]] }
      : `\${self:custom.${table}Table.arn}`
    const requiresDefaultLambdaConfig = actionsRequiresDefaultLambdaConfig(actions)

    if (requiresDefaultLambdaConfig) {
      const defaultRoleStatements = mapRoleStatements(defaultLambdaConfig)
      statements = statements.concat(defaultRoleStatements)
    }

    statements.push({
      Effect: 'Allow',
      Action,
      Resource,
    })
  })

  ses.forEach(({ actions, email }) => {
    const Action = actions.map(action => `ses:${action}`)
    const Resource = `arn:aws:ses:#{AWS::Region}:#{AWS::AccountId}:identity/${email}`
    statements.push({
      Effect: 'Allow',
      Action,
      Resource,
    })
  })

  lambda.forEach(({ actions, name }) => {
    const Action = actions.map(action => `lambda:${action}`)
    const Resource
      = `arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:goalflags-api-\${self:provider.stage}-${
        name}`
    statements.push({
      Effect: 'Allow',
      Action,
      Resource,
    })
  })

  executeApi.forEach(({ actions, resource }) => {
    const Action = actions.map(action => `execute-api:${action}`)
    statements.push({
      Effect: 'Allow',
      Action,
      Resource: resource,
    })
  })

  return statements
}

type AwsFunctionConfig = AWS['functions']['function']

export interface AwsFunction extends AwsFunctionConfig {
  iamRoleStatements: AWSPermissionConfig
}
