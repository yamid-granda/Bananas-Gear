import type { APIGatewayProxyResult } from 'aws-lambda'
import { InternalServerError, UnauthorizedError } from 'http-errors-enhanced'
import type { Asset } from 'aws-sdk/clients/codeartifact'
import type { AssetAddReqDoc } from '../../types'
import { addAssetInDb } from '../../db-services/addAssetInDb'
import { getAssetFromDoc } from '../../utils'
import { NULL_ASSET_ID_VALUE } from '../../configs'
import type { addAssetSchema } from './schema'
import type { ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import type { ApiRes } from '@/api/types'
import { getDataFromAuthorization } from '@/api/utils/auth/getDataFromAuthorization'
import { getUserById } from '@/api/utils/db/users/getUserById'

interface PathParameters {
  companyId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof addAssetSchema, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId } = event.pathParameters
  const { userId } = getDataFromAuthorization(event.headers.Authorization)
  const { result: userDoc } = await getUserById(userId)

  if (userDoc.companyId !== companyId)
    throw new UnauthorizedError()

  const { name } = event.body

  const addReqDoc: AssetAddReqDoc = {
    assetId: NULL_ASSET_ID_VALUE,
    companyId,
    createdBy: userId,
    name,
  }

  const dbRes = await addAssetInDb(addReqDoc)

  if (!dbRes.isSuccess)
    throw new InternalServerError()

  const assetDoc = dbRes.result
  const asset = getAssetFromDoc(assetDoc)
  const res: ApiRes<Asset> = { response: asset }

  return {
    statusCode: 201,
    body: JSON.stringify(res),
  }
}

export const main = middyfy(handler)
