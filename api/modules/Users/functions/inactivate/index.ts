import { UsersApiPath } from '../../config'
import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'

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

export const inactivateUser: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'DELETE',
        path: UsersApiPath.inactivate,
        cors,
      },
    },
  ],
  iamRoleStatements,
}
