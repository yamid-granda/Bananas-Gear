import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Companies',
      actions: ['GetItem'],
    },
    {
      table: 'Users',
      actions: ['GetItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const companyAuthorizer: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
}
