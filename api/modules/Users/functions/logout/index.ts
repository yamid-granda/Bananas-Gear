import { UsersApiPath } from '../../config'
import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'

export * from './types'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Users',
      actions: ['UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const logoutUser: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'POST',
        path: UsersApiPath.logout,
        cors,
      },
    },
  ],
}
