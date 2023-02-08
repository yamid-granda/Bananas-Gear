import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'
import { AssetsApiPath } from '../../configs'
import { HttpMethod, TableName } from '../../../../configs'
import { addAssetSchema } from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: TableName.ASSETS,
      actions: ['PutItem'],
    },
    {
      table: TableName.USERS,
      actions: ['GetItem'],
    },
    {
      table: 'counts',
      actions: ['UpdateItem'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const addAsset: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  iamRoleStatements,
  events: [
    {
      http: {
        cors,
        authorizer: companyAuthorizer,
        method: HttpMethod.POST,
        path: AssetsApiPath.ADD,
        request: {
          schemas: {
            'application/json': addAssetSchema,
          },
        },
      },
    },
  ],
}
