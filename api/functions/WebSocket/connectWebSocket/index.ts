import type { AWS } from '@serverless/typescript'
import type { AWSPermissionConfig, AwsFunction } from '../../../utils/aws'
import { mapRoleStatements } from '../../../utils/aws'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'WebSocketConnections',
      actions: ['PutItem'],
    },
    {
      table: 'Companies',
      actions: ['GetItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const connectWebSocket: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      websocket: {
        route: '$connect',
      },
    },
  ],
  iamRoleStatements,
}
