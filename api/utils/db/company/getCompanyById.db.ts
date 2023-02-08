import { getDynamoDBDocument } from '../../clients/dynamoDB/getDynamoDBDocument'
import type { CompanyDocument } from '../../sharedUtils/interfaces'

export const getCompanyById = async(id: string): Promise<CompanyDocument | null> => {
  const response = await getDynamoDBDocument({
    name: 'GET_COMPANY_BY_ID',
    params: {
      TableName: `${process.env.COMPANIES_TABLE_NAME}`,
      Key: { id },
    },
  })

  let document = null
  if (response.Item) document = response.Item as CompanyDocument
  return document
}
