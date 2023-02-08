import type { AWS } from '@serverless/typescript'
import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'
import { cors } from '../../utils/serverless-framework-configs'
import schema from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'CompanyPasswordRecoveryRequests',
      actions: ['PutItem'],
    },
    {
      table: 'Companies',
      index: 'companies-email',
      actions: ['Query'],
    },
    {
      table: 'counts',
      actions: ['GetItem', 'UpdateItem'],
    },
  ],
  ses: [
    {
      actions: ['SendEmail'],
      email: 'admin@goalflags.com',
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const requestCompanyPasswordRecovery: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'company/request-password-recovery',
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
