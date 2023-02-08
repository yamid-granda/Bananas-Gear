import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import type {
  CompanyPasswordRecoveryRequest,
  CompanyPasswordRecoveryRequestCreator,
} from '../../utils/'
import {
  createCompanyPasswordRecoveryRequest,
} from '../../utils/'
import { generateKey } from '../../utils/generateKey.util'
import { getCompanyByEmail } from '../../utils/db/company/getCompanyByEmail.db'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../utils/apiGateway.util'
import { stages } from '../../utils/stages.enum'
import { sendEmail } from '../../utils/sendEmail.util'
import { middyfy } from '../../utils/lambda.util'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, null> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const { email } = event.body

  const companyDocument = await getCompanyByEmail(email)
  if (!companyDocument) throw new BadRequestError('company email is not registered')

  const secretKey = generateKey()
  const creator: CompanyPasswordRecoveryRequestCreator = {
    companyId: companyDocument.id,
    email,
    secretKey,
  }

  const stage = process.env.STAGE
  const subdomain = stage === stages.PRO ? '' : `${stage}.`
  const { document: passwordRecoveryRequestDocument } = await createCompanyPasswordRecoveryRequest(
    creator,
  )
  const passwordResetUrl = `https://${subdomain}goalflags.com/login/reset-password?email=${companyDocument.email}&id=${passwordRecoveryRequestDocument.id}&secretKey=${passwordRecoveryRequestDocument.secretKey}`

  await sendEmail({
    Destination: {
      ToAddresses: [companyDocument.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            Hi <strong>${companyDocument.name}</strong>, to reset your password use the following link:<br>
            <a href="${passwordResetUrl}">Reset my GoalFlags Password</a> - Incentive innovate your team.
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Reset Password - GoalFlags',
      },
    },
    Source: 'GoalFlags <admin@goalflags.com>',
  })

  const response: CompanyPasswordRecoveryRequest = {
    email: passwordRecoveryRequestDocument.email,
    attempts: passwordRecoveryRequestDocument.attempts,
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
