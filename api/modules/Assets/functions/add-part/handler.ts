import type { APIGatewayProxyResult } from 'aws-lambda'
import { BadRequestError, InternalServerError, UnauthorizedError } from 'http-errors-enhanced'
import type { Asset } from 'aws-sdk/clients/codeartifact'
import type { AssetAddReqDoc } from '../../types'
import { addAssetInDb } from '../../db-services/addAssetInDb'
import { getAssetPartFromDoc } from '../../utils'
import { getAssetFromDb } from '../../db-services/getAssetFromDb'
import type { addAssetPartSchema } from './schema'
import type { ValidatedEventAPIGatewayProxyEvent } from '@/api/utils'
import { middyfy } from '@/api/utils/lambda.util'
import type { ApiRes } from '@/api/types'
import { getDataFromAuthorization } from '@/api/utils/auth/getDataFromAuthorization'
import { getUserById } from '@/api/utils/db/users/getUserById'

interface PathParameters {
  companyId: string
  assetId: string
}

const handler: ValidatedEventAPIGatewayProxyEvent<typeof addAssetPartSchema, PathParameters> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { companyId, assetId } = event.pathParameters
  const { isSuccess: existAsset, result: assetDoc } = await getAssetFromDb(assetId)

  if (!existAsset)
    throw new BadRequestError('this asset not exist')

  if (assetDoc.companyId !== companyId)
    throw new BadRequestError('the asset company id does not match')

  const { userId } = getDataFromAuthorization(event.headers.Authorization)
  const { result: userDoc } = await getUserById(userId)

  if (userDoc.companyId !== companyId)
    throw new UnauthorizedError()

  const { name, parentAssetId } = event.body

  const addReqDoc: AssetAddReqDoc = {
    assetId,
    companyId,
    createdBy: userId,
    name,
    parentId: parentAssetId || assetId,
  }

  const dbRes = await addAssetInDb(addReqDoc)

  if (!dbRes.isSuccess)
    throw new InternalServerError()

  const assetPartDoc = dbRes.result
  const assetPart = getAssetPartFromDoc(assetPartDoc)
  const res: ApiRes<Asset> = { response: assetPart }

  return {
    statusCode: 201,
    body: JSON.stringify(res),
  }
}

export const main = middyfy(handler)
