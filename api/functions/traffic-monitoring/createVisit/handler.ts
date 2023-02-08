import type { APIGatewayProxyResult } from 'aws-lambda'
import { middyfy } from '../../../utils/lambda.util'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../../utils/apiGateway.util'
import type { VisitDocument } from '../../../utils/interfaces/documents/visit'
import { createVisit } from '../../../utils/services/db/visits/create'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, any> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const { headers, requestContext, body } = event
  const { path, width, height } = body
  const {
    'CloudFront-Viewer-Country': headersCountry,
    'CloudFront-Is-Desktop-Viewer': isDesktop,
    'CloudFront-Is-Mobile-Viewer': isMobile,
    'CloudFront-Is-SmartTV-Viewer': isSmartTV,
    'CloudFront-Is-Tablet-Viewer': isTablet,
    'User-Agent': userAgent,
  } = headers
  const { requestTimeEpoch: time, identity } = requestContext
  const { sourceIp: ip } = identity

  const date = new Date(time).toISOString()
  const country = headersCountry || 'unknown'
  const device
    = isMobile === 'true'
      ? 'mobile'
      : isDesktop === 'true'
        ? 'desktop'
        : isTablet === 'true'
          ? 'tablet'
          : isSmartTV === 'true'
            ? 'smartTV'
            : 'unknown'

  const visitDocument: VisitDocument = {
    type: 'visit',
    ip,
    userAgent,
    date,
    device,
    country,
    path,
    width,
    height,
  }

  await createVisit(visitDocument)

  return {
    statusCode: 201,
    body: JSON.stringify({ success: true, event }),
  }
}

export const main = middyfy(handler)
