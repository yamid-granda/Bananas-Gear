import { UsersApiPath } from '../../config'
import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { cors } from '../../../../utils/serverless-framework-configs'
import { userLoginReqSchema } from './schema'

export * from './types'
export * from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Users',
      actions: ['UpdateItem'],
    },
    {
      table: 'Users',
      index: 'email',
      actions: ['Query'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const loginUser: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: UsersApiPath.login,
        cors,
        request: {
          schemas: {
            'application/json': userLoginReqSchema,
          },
        },
      },
    },
  ],
  iamRoleStatements,
}
