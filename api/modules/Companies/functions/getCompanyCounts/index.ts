import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'
import { CompanyApiPath } from '../../config'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'counts',
      actions: ['GetItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const getCompanyCounts: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'GET',
        path: `${CompanyApiPath.counts}/{companyId}`,
        cors,
      },
    },
  ],
}
