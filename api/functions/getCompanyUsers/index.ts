import type { AWSPermissionConfig, AwsFunction } from '../../utils/aws'
import { mapRoleStatements } from '../../utils/aws'
import { companyAuthorizer, cors } from '../../utils/serverless-framework-configs'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Users',
      index: 'companyId-nameSortKey',
      actions: ['Query', 'PartiQLSelect'],
    },
    {
      table: 'Users',
      index: 'companyId-email',
      actions: ['Query', 'PartiQLSelect'],
    },
    // {
    //   table: 'Users',
    //   index: 'companyId-email',
    //   actions: ['Select', 'PartiQLSelect'],
    // },
    {
      table: 'Users',
      index: 'companyId-status',
      actions: ['Query', 'PartiQLSelect'],
    },
    {
      table: 'counts',
      actions: ['GetItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const getCompanyUsers: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'GET',
        path: 'company/users/{companyId}',
        cors,
      },
    },
  ],
  iamRoleStatements,
}
