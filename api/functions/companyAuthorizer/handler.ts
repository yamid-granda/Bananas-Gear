import type { APIGatewayAuthorizerHandler } from 'aws-lambda'
import { verify } from 'jsonwebtoken'
import { getUserById } from 'utils/db/users/getUserById'
import { getCompanyById } from '../../utils/db/company/getCompanyById.db'
import { getDataFromAuthorization } from '@/api/utils/auth/getDataFromAuthorization'

type Effect = 'Allow' | 'Deny' | null

interface JwtPayload {
  secretKey: string | null
}

const generatePolicyDocument = (Effect: Effect, Resource: string) => {
  if (!Effect || !Resource)
    return null

  return {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect,
        Resource,
      },
    ],
  }
}

const generateAuthResponse = (principalId: string, Effect: Effect, methodArn: string) => {
  const policyDocument = generatePolicyDocument(Effect, methodArn)

  return {
    principalId,
    policyDocument,
  }
}

const handler: APIGatewayAuthorizerHandler = async (event) => {
  // @ts-expect-error authorizationToken is not defined in event
  const { token, type, userId } = getDataFromAuthorization(event.authorizationToken)
  const { methodArn } = event

  if (!token || !methodArn)
    return generateAuthResponse('null', 'Deny', methodArn)

  let userDoc

  if (type === 'user') {
    const userRes = await getUserById(userId || 'null')
    userDoc = userRes.result
  }
  else {
    userDoc = await getCompanyById(userId || 'null')
  }

  const hasSecrets = userDoc?.salt && userDoc?.secretKey

  if (!hasSecrets)
    return generateAuthResponse('null', 'Deny', methodArn)

  let decoded: JwtPayload
  let secretKey: string

  try {
    decoded = verify(token, userDoc.salt + process.env.JWT_SECRET) as JwtPayload
    secretKey = userDoc.secretKey
  }
  catch (error) {
    decoded = {
      secretKey: null,
    }
  }

  let hasAccess = false

  if (decoded.secretKey && secretKey === decoded.secretKey)
    hasAccess = true

  return generateAuthResponse(userId, hasAccess ? 'Allow' : 'Deny', methodArn)
}

export const main = handler
