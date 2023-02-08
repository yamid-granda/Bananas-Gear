import { createDynamoDBDocument } from '../../../clients/dynamoDB/createDynamoDBDocument'
import type { CreateDynamoDBDocumentOutput } from '../../../../utils/interfaces/dynamoDB/CreateDynamoDBDocumentOutput.interface'
import type { VisitDocument } from '../../../interfaces/documents/visit'

export const createVisit = async(
  creationDocument: VisitDocument,
): Promise<CreateDynamoDBDocumentOutput<VisitDocument>> => {
  return createDynamoDBDocument({
    name: 'CREATE_VISIT',
    ignoreBaseDocument: true,
    params: {
      TableName: `${process.env.VISITS_TABLE_NAME}`,
      Item: creationDocument,
    },
  })
}
