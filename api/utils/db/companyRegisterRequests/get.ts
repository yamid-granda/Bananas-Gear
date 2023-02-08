import { getDynamoDBDocument } from '../../clients/dynamoDB/getDynamoDBDocument'
import type { CompanyRegisterRequestDocument } from '../../sharedUtils/interfaces'

export const getCompanyRegisterRequestById = async(
  id: string,
): Promise<CompanyRegisterRequestDocument | null> => {
  const response = await getDynamoDBDocument({
    name: 'GET_COMPANY_REGISTER_REQUEST_BY_ID',
    params: {
      TableName: `${process.env.CompanyRegisterRequests3TableName}`,
      Key: { id },
    },
  })

  let document = null

  if (response.Item)
    document = response.Item as CompanyRegisterRequestDocument

  return document
}
