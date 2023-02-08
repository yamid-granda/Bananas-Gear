import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'
import { cors } from '../../utils/serverless-framework-configs'
import schema from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'CompanyRegisterRequests3',
      actions: ['PutItem', 'UpdateItem'],
    },
    {
      table: 'counts',
      actions: ['PutItem', 'UpdateItem'],
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

export const registerCompany: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'company/register',
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
