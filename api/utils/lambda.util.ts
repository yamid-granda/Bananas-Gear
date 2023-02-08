import type { MiddlewareObj } from '@middy/core'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpEventNormalizer from '@middy/http-event-normalizer'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import { serializeError } from 'serialize-error'
import { CORS_ORIGINS } from './serverless-framework-configs/cors.config'
import { IS_PRODUCTION } from './constants.util'

interface Error {
  error: string
  statusCode: number
}

interface Response {
  body: string
  statusCode: number
}

interface Request {
  error: Error
  response: Response
}

const origins = IS_PRODUCTION ? CORS_ORIGINS : ['*']

function omit<T, K extends string>(
  names: readonly K[],
  obj: T,
): Omit<T, K> {
  const result: any = {}
  const index: any = {}
  let idx = 0
  const len = names.length

  while (idx < len) {
    index[names[idx]] = 1
    idx += 1
  }

  for (const prop in obj) {
    if (!index[prop])
      result[prop] = obj[prop]
  }
  return result
}

class ErrorHandlerMiddleware implements MiddlewareObj {
  public onError = async (request: any) => {
    const errorRequest: Request = request
    const { error } = errorRequest

    request.response = {
      body: JSON.stringify(omit(['stack'], serializeError(error))),
      statusCode: error.statusCode,
    }
  }
}

export const middyfy = (handler: any) => {
  return middy(handler).use([
    middyJsonBodyParser(),
    httpEventNormalizer(),
    new ErrorHandlerMiddleware(),
    cors({ origins }),
  ])
}
