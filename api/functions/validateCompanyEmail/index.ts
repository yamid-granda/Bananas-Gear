import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'CompanyRegisterRequests3',
      actions: ['GetItem', 'UpdateItem'],
    },
    {
      table: 'Companies',
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
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const validateCompanyEmail: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'company/validate-email/{id}/{secretKey}',
      },
    },
  ],
  iamRoleStatements,
}
