import { UnauthorizedError } from 'http-errors-enhanced'

type AuthorizationSplit = [string, 'user' | 'company' | '', string]
type AuthorizationType = 'user' | 'company'

interface AuthorizationData {
  token: string
  type: AuthorizationType
  userId: string
}

export function getDataFromAuthorization(authorization: string): AuthorizationData {
  const authorizationSplit = (authorization || '').split('/') as AuthorizationSplit
  const token = authorizationSplit[0].replace('Bearer ', '')
  const type = authorizationSplit[1] as AuthorizationType
  const userId = authorizationSplit[2]

  if (!token || !type || !userId)
    throw new UnauthorizedError()

  return {
    token,
    type,
    userId,
  }
}
