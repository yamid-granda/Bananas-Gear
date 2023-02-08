import type { AWS } from '@serverless/typescript'
import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'
import { companyAuthorizer, cors } from '../../utils/serverless-framework-configs'
import schema from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Companies',
      actions: ['UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const updateCompany: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'PATCH',
        path: 'company/update/{id}',
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
