import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../utils/apiGateway.util'
import { STAGE } from '../../utils/constants.util'
import { createCompany } from '../../utils/db/company/create'
import { getCompanyByEmail } from '../../utils/db/company/getCompanyByEmail.db'
import { getCompanyRegisterRequestById } from '../../utils/db/companyRegisterRequests/get'
import { updateCompanyRegisterRequestBy } from '../../utils/db/companyRegisterRequests/update'
import { generateKey } from '../../utils/generateKey.util'
import { middyfy } from '../../utils/lambda.util'
import type { CompanyDocument } from '../../utils/sharedUtils/interfaces'
import { stages } from '../../utils/stages.enum'
import type schema from './schema'

const getRedirectUrl = (companyDocument: CompanyDocument): string => {
  let redirectUrl = 'https://goalflags.com/login'
  const urlParams = `?name=${companyDocument.name}&email=${companyDocument.email}`

  if (STAGE === stages.TEST) redirectUrl = 'https://test.goalflags.com/login'
  else if (STAGE === stages.DEV) redirectUrl = 'http://localhost:3000'

  return redirectUrl + urlParams
}

interface PathParameters {
  id: string
  secretKey: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, PathParameters> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const { id, secretKey } = event.pathParameters

  const registrationRequestDoc = await getCompanyRegisterRequestById(id)

  if (!registrationRequestDoc)
    throw new BadRequestError('registration request not exist')

  const companyDocument = await getCompanyByEmail(registrationRequestDoc.email)

  const response = {
    statusCode: 301,
    body: JSON.stringify({}),
    headers: {
      Location: '',
    },
  }

  if (companyDocument) {
    response.headers.Location = getRedirectUrl(companyDocument)
    return response
  }

  if (registrationRequestDoc.validationAttempts > 2)
    throw new BadRequestError('you have exceeded the max email validation attempts number')

  if (secretKey !== registrationRequestDoc.secretKey) {
    await updateCompanyRegisterRequestBy(id, {
      validationAttempts: registrationRequestDoc.validationAttempts + 1,
    })

    throw new BadRequestError('invalid secret key')
  }

  const { document: newCompanyDocument } = await createCompany({
    dialCode: registrationRequestDoc.dialCode,
    email: registrationRequestDoc.email,
    iso2: registrationRequestDoc.iso2,
    name: registrationRequestDoc.name,
    password: registrationRequestDoc.password,
    phone: registrationRequestDoc.phone,
    registrationRequestId: registrationRequestDoc.id,
    salt: generateKey(),
    secretKey: generateKey(),
  })

  if (!newCompanyDocument)
    throw new BadRequestError('company not created')

  await updateCompanyRegisterRequestBy(id, { status: 'created' })

  response.headers.Location = getRedirectUrl(newCompanyDocument)

  return response
}

export const main = middyfy(handler)
