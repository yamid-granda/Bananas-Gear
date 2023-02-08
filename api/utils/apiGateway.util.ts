import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

type ValidatedAPIGatewayProxyEvent<S, PathParameters> = Omit<APIGatewayProxyEvent, 'body'> & {
  // @ts-expect-error Type 'S' does not satisfy the constraint 'JSONSchema7'
  body: FromSchema<S>
  pathParameters: PathParameters
}
export type ValidatedEventAPIGatewayProxyEvent<S, PathParameters> = Handler<
ValidatedAPIGatewayProxyEvent<S, PathParameters>,
APIGatewayProxyResult
>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
