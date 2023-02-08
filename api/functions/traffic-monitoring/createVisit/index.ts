import type { AWS } from '@serverless/typescript'
import type { AWSPermissionConfig, AwsFunction } from '../../../utils/aws'
import { mapRoleStatements } from '../../../utils/aws'
import { cors } from '../../../utils/serverless-framework-configs'
import schema from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Visits',
      actions: ['PutItem'],
    },
    {
      table: 'counts',
      actions: ['GetItem', 'UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const createVisit: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
  events: [
    {
      http: {
        method: 'POST',
        path: 'traffic-monitoring/visits',
        cors,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
}
