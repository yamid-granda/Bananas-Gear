import type { AWSPermissionConfig, AwsFunction } from '../../../utils/aws'
import { mapRoleStatements } from '../../../utils/aws'
import { cors } from '../../../utils/serverless-framework-configs'
import schema from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Companies',
      index: 'companies-email',
      actions: ['Query'],
    },
    {
      table: 'Companies',
      actions: ['UpdateItem'],
    },
    {
      table: 'counts',
      actions: ['GetItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const loginCompany: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'company/login',
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
