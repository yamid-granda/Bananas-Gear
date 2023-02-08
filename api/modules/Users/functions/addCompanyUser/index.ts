import type { AWSPermissionConfig, AwsFunction } from '../../../../utils/aws'
import { mapRoleStatements } from '../../../../utils/aws'
import { companyAuthorizer, cors } from '../../../../utils/serverless-framework-configs'
import { userCreatorSchema } from './schema'

const permissionConfig: AWSPermissionConfig = {
  dynamodb: [
    {
      table: 'Users',
      actions: ['PutItem'],
    },
    {
      table: 'Users',
      index: 'companyId-email',
      actions: ['Query'],
    },
    {
      table: 'counts',
      actions: ['GetItem', 'UpdateItem'],
    },
  ],
  ses: [
    {
      email: 'admin@goalflags.com',
      actions: ['SendEmail'],
    },
  ],
  lambda: [
    {
      name: 'sendWebSocketMessage',
      actions: ['InvokeFunction'],
    },
  ],
}

const iamRoleStatements = mapRoleStatements(permissionConfig)

export const addCompanyUser: AwsFunction = {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        authorizer: companyAuthorizer,
        method: 'POST',
        path: 'company/add-user/{companyId}',
        cors,
        request: {
          schemas: {
            'application/json': userCreatorSchema,
          },
        },
      },
    },
  ],
  iamRoleStatements,
}
