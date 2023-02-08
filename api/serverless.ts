import type { AWS } from '@serverless/typescript'

import {
  companyAuthorizer,
  connectWebSocket,
  createVisit,
  disconnectWebSocket,
  formatUsersTableSortKeys,
  getCompanyUsers,
  loginCompany,
  logoutCompany,
  registerCompany,
  requestCompanyPasswordRecovery,
  resetCompanyPassword,
  sendWebSocketMessage,
  updateCompany,
  updateCompanyRegisterRequirements,
  validateCompanyEmail,
} from './functions'

import {
  getCompanyById,
  getCompanyCounts,
} from './modules/Companies'

import {
  addCompanyUser,
  editUser,
  getUserById,
  inactivateUser,
  loginUser,
  logoutUser,
  reactivateUser,
} from './modules/Users'

import {
  AssetsTable,
} from './modules/Assets/tables'

import { addAsset } from './modules/Assets/functions/add'
import { addAssetPart } from './modules/Assets/functions/add-part'
import { getAsset } from './modules/Assets/functions/get'
import { updateAsset } from './modules/Assets/functions/update'
import { inactivateAsset } from './modules/Assets/functions/inactivate'
import { activateAsset } from './modules/Assets/functions/activate'
import { queryAsset } from './modules/Assets/functions/query'

import {
  CompaniesTable,
  CompanyPasswordRecoveryRequestsTable,
  CompanyRegisterRequests3Table,
  UsersTable,
  VisitsTable,
  WebSocketConnectionsTable,
  countsTable,
} from './tables'
import { apiGatewayResourcesConfig } from './utils/serverless-framework-configs'

const serverlessConfig: AWS = {
  service: 'goalflags-api',
  frameworkVersion: '2',
  provider: {
    profile: 'goalflags',
    name: 'aws',
    runtime: 'nodejs16.x',
    lambdaHashingVersion: '20201221',
    stage: '${opt:stage, "dev"}',
    region: 'us-east-1',
    architecture: 'arm64',
    environment: {
      // infrastructure
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      STAGE: '${opt:stage, "dev"}',
      SERVICE: '${self:service}',
      REGION: '${self:provider.region}',
      JWT_SECRET: '${self:custom.secrets.JWT_SECRET}',
      countsTable: '${self:custom.countsTable.name}',
      WEB_SOCKET_CONNECTIONS_TABLE_NAME: '${self:custom.WebSocketConnectionsTable.name}',
      WEB_SOCKET_API_DOMAIN: {
        'Fn::Join': [
          '',
          [
            { Ref: 'WebsocketsApi' },
            '.execute-api.',
            '${self:provider.region}',
            '.amazonaws.com/',
            '${self:provider.stage}',
          ],
        ],
      },

      // business
      COMPANIES_TABLE_NAME: '${self:custom.CompaniesTable.name}',
      CompanyRegisterRequests3TableName: '${self:custom.CompanyRegisterRequests3Table.name}',
      COMPANY_PASSWORD_RECOVERY_REQUESTS_TABLE_NAME:
        '${self:custom.CompanyPasswordRecoveryRequestsTable.name}',
      USERS_TABLE_NAME: '${self:custom.UsersTable.name}',
      ASSETS_TABLE_NAME: '${self:custom.AssetsTable.name}',
      VISITS_TABLE_NAME: '${self:custom.VisitsTable.name}',
    },
    apiGateway: {
      // minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
  },
  resources: {
    Resources: {
      ...apiGatewayResourcesConfig,

      // infrastructure
      countsTable,
      WebSocketConnectionsTable,

      // business
      CompaniesTable,
      CompanyRegisterRequests3Table,
      CompanyPasswordRecoveryRequestsTable,
      UsersTable,
      AssetsTable,

      // traffic monitoring
      VisitsTable,
    },
  },
  plugins: [
    'serverless-pseudo-parameters',
    'serverless-iam-roles-per-function',
    'serverless-esbuild',
  ],
  package: {
    individually: true,
  },
  custom: {
    secrets: '${file(secrets.json)}',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: false,
    },
    esbuild: {
      bundle: true,
      minify: true,
    },
    DB: {
      prefix: 'GF',
    },

    // infrastructure
    countsTable: {
      name: '${self:custom.DB.prefix}-Counts-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['countsTable', 'Arn'],
      },
    },
    WebSocketConnectionsTable: {
      name: '${self:custom.DB.prefix}-WebSocketConnections-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['WebSocketConnectionsTable', 'Arn'],
      },
    },

    // business
    CompaniesTable: {
      name: '${self:custom.DB.prefix}-Companies-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['CompaniesTable', 'Arn'],
      },
    },
    CompanyRegisterRequests3Table: {
      name: '${self:custom.DB.prefix}-CompanyRegisterRequests3-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['CompanyRegisterRequests3Table', 'Arn'],
      },
    },
    CompanyPasswordRecoveryRequestsTable: {
      name: '${self:custom.DB.prefix}-CompanyPasswordRecoveryRequests-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['CompanyPasswordRecoveryRequestsTable', 'Arn'],
      },
    },
    UsersTable: {
      name: '${self:custom.DB.prefix}-Users-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['UsersTable', 'Arn'],
      },
    },
    AssetsTable: {
      name: '${self:custom.DB.prefix}-Assets-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['AssetsTable', 'Arn'],
      },
    },

    // traffic monitoring
    VisitsTable: {
      name: '${self:custom.DB.prefix}-Visits-${opt:stage, \'dev\'}',
      arn: {
        'Fn::GetAtt': ['VisitsTable', 'Arn'],
      },
    },
  },
  functions: {
    // infrastructure
    connectWebSocket,
    disconnectWebSocket,
    sendWebSocketMessage,

    // Company
    registerCompany,
    updateCompanyRegisterRequirements,
    validateCompanyEmail,
    loginCompany,
    logoutCompany,
    logoutUser,
    updateCompany,
    companyAuthorizer,
    getCompanyById,
    getCompanyCounts,

    // User
    addCompanyUser,
    inactivateUser,
    reactivateUser,
    editUser,
    getUserById,
    loginUser,
    getCompanyUsers,
    requestCompanyPasswordRecovery,
    resetCompanyPassword,

    // Assets
    addAsset,
    addAssetPart,
    getAsset,
    updateAsset,
    inactivateAsset,
    activateAsset,
    queryAsset,

    // traffic monitoring
    createVisit,

    // refactor scripts
    formatUsersTableSortKeys,
    // hello: {
    //   handler: 'functions/hello.helloMain',
    //   role: '',
    //   events: [
    //     {
    //       http: {
    //         method: 'GET',
    //         path: 'hello',
    //       },
    //     },
    //   ],
    // },
  },
}

module.exports = serverlessConfig
