import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError } from 'http-errors-enhanced'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../../utils/apiGateway.util'
import { middyfy } from '../../../utils/lambda.util'
import { updateCompanyRegister } from '../../../utils/services/db/CompanyRegister/update'
import type { CompanyRegisterRequest } from '../../../utils/sharedUtils/interfaces/companyRegisterRequest/companyRegisterRequest.interface'
import { getCompanyRegisterRequestById } from '../../../utils/db/companyRegisterRequests/get'
import type schema from './schema'

interface PathParameters {
  registerId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema, PathParameters> = async(
  event,
): Promise<APIGatewayProxyResult> => {
  const { registerId: registerRequestId } = event.pathParameters
  const { businessSector, greaterNeed, ideas } = event.body

  const register = await getCompanyRegisterRequestById(registerRequestId)


  if (register?.greaterNeed)
    throw new BadRequestError('company register requirements exist')

  const document = await updateCompanyRegister(registerRequestId, { businessSector, greaterNeed, ideas })

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
