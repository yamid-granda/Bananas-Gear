import type { APIGatewayProxyResult } from 'aws-lambda'
import { hashSync } from 'bcryptjs'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../utils'
import { stages } from '../../utils'
import { createCompanyRegisterRequest } from '../../utils/db/companyRegisterRequests/create'
import { middyfy } from '../../utils/lambda.util'
import { sendEmail } from '../../utils/sendEmail.util'
import type { CompanyRegisterRequest, RegisterCompanyRequest } from '../../utils/sharedUtils/interfaces'
import { getVerifyCompanyEmailRegisterRequestEmail } from '../../emails/verifyCompanyEmailRegisterRequest/verifyCompanyEmailRegisterRequest'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, null> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const { email, name, password, phone, iso2, dialCode } = event.body

  const registerCompanyRequest: RegisterCompanyRequest = {
    email,
    name,
    password: hashSync(password),
    phone,
    iso2,
    dialCode,
  }

  const { document } = await createCompanyRegisterRequest(registerCompanyRequest)

  const stage = process.env.STAGE
  const subdomain = stage === stages.PRO ? '' : `${stage}.`
  const validationUrl = `https://${subdomain}api.goalflags.com/company/validate-email/${document.id}/${document.secretKey}`

  await sendEmail({
    Destination: {
      ToAddresses: [document.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: getVerifyCompanyEmailRegisterRequestEmail({ validationUrl }),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Career Path Management Tool',
      },
    },
    Source: 'GoalFlags <admin@goalflags.com>',
  })

  const response: CompanyRegisterRequest = {
    id: document.id,
    createdAt: document.createdAt,
    email: document.email,
    name: document.name,
    status: document.status,
    validationAttempts: document.validationAttempts,
    iso2: document.iso2,
    dialCode: document.dialCode,
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  }
}

export const main = middyfy(handler)
