import type { AWS } from '@serverless/typescript'
import type { AWSPermissionConfig, AwsFunction } from '../../../utils/aws'
import { mapRoleStatements } from '../../../utils/aws'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'WebSocketConnections',
      actions: ['DeleteItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const disconnectWebSocket: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      websocket: {
        route: '$disconnect',
      },
    },
  ],
  iamRoleStatements,
}
