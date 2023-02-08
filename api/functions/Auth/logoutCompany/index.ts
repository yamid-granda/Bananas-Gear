import type { AWSPermissionConfig, AwsFunction } from '../../../utils/aws'
import { mapRoleStatements } from '../../../utils/aws'
import { companyAuthorizer, cors } from '../../../utils/serverless-framework-configs'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Companies',
      actions: ['UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const logoutCompany: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'POST',
        path: 'company/logout/{companyId}',
        cors,
      },
    },
  ],
  iamRoleStatements,
}
