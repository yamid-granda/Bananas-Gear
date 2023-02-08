import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'
import { AssetsApiPath, AssetsTableIndex } from '../../configs'
import { HttpMethod, TableName } from '../../../../configs'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: TableName.ASSETS,
      actions: ['Query'],
      index: AssetsTableIndex.COMPANY_ID__NAME_SORT_KEY,
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const queryAsset: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
  events: [
    {
      http: {
        cors,
        authorizer: companyAuthorizer,
        method: HttpMethod.GET,
        path: AssetsApiPath.QUERY,
      },
    },
  ],
}
