import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { cors } from '../../../../utils/serverless-framework-configs'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Companies',
      actions: ['GetItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const getCompanyById: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'company/{companyId}',
        cors,
      },
    },
  ],
  iamRoleStatements,
}
