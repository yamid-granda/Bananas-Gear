import { UsersApiPath } from '../../config'
import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'
import { userEditorSchema } from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Users',
      actions: ['UpdateItem', 'GetItem'],
    },
  ],
  lambda: [
    {
      name: 'sendWebSocketMessage',
      actions: ['InvokeFunction'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const editUser: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        cors,
        authorizer: companyAuthorizer,
        method: 'PATCH',
        path: UsersApiPath.edit,
        request: {
          schemas: {
            'application/json': userEditorSchema,
          },
        },
      },
    },
  ],
  iamRoleStatements,
}
