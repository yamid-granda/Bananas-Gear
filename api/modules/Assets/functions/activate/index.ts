import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'
import { AssetsApiPath } from '../../configs'
import { HttpMethod } from '../../../../configs'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Assets',
      actions: ['UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const activateAsset: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
  events: [
    {
      http: {
        cors,
        authorizer: companyAuthorizer,
        method: HttpMethod.POST,
        path: AssetsApiPath.ACTIVATE,
      },
    },
  ],
}
