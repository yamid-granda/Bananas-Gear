export const IS_PRODUCTION_DEPLOY = process.env.npm_lifecycle_script?.includes('--stage pro')

export const apiGatewayResourcesConfig = {
  GatewayResponseDefault4XX: {
    Type: 'AWS::ApiGateway::GatewayResponse',
    Properties: {
      ResponseParameters: {
        'gatewayresponse.header.Access-Control-Allow-Origin': '\'*\'',
        'gatewayresponse.header.Access-Control-Allow-Headers': '\'*\'',
      },
      ResponseType: 'DEFAULT_4XX',
      RestApiId: {
        Ref: 'ApiGatewayRestApi',
      },
    },
  },
}

export * from './cors.config'
export * from './companyAuthorizer.config'
