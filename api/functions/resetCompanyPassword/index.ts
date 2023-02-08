import type { AWS } from '@serverless/typescript'
import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'
import { cors } from '../../utils/serverless-framework-configs'
import schema from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'CompanyPasswordRecoveryRequests',
      actions: ['GetItem', 'UpdateItem'],
    },
    {
      table: 'Companies',
      actions: ['UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const resetCompanyPassword: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'company/reset-password',
        cors,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
  iamRoleStatements,
}
