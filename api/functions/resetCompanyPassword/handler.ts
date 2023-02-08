import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import { hashSync } from 'bcryptjs'
import type {
  CompanyPasswordReset,
  ValidatedEventAPIGatewayProxyEvent,
} from '../../utils'
import {
  getCompanyPasswordRecoveryRequestById,
  updateCompanyById,
  updateCompanyPasswordRecoveryRequestById,
} from '../../utils'
import { middyfy } from '../../utils/lambda.util'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, null> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const { id, secretKey: requestSecretKey, newPassword } = event.body
  const recoveryRequestDocument = await getCompanyPasswordRecoveryRequestById(id)

  if (!recoveryRequestDocument)
    throw new BadRequestError('company password recovery request not found')

  const { attempts, secretKey, companyId, status } = recoveryRequestDocument

  if (status === 'completed')
    throw new BadRequestError('recovery request has already been completed')

  if (attempts >= 3) throw new BadRequestError('you have exceeded the maximum number of attempts')

  if (requestSecretKey !== secretKey) {
    await updateCompanyPasswordRecoveryRequestById(id, {
      attempts: recoveryRequestDocument.attempts + 1,
    })
    throw new BadRequestError('invalid secret key')
  }

  const password = hashSync(newPassword)
  const companyDocument = await updateCompanyById(companyId, { password })
  if (!companyDocument) throw new BadRequestError('failed company password reset')

  await updateCompanyPasswordRecoveryRequestById(id, { status: 'completed' })

  const response: CompanyPasswordReset = {
    email: companyDocument.email,
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
