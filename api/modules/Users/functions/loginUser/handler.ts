import { sign } from 'jsonwebtoken'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { compareSync } from 'bcryptjs'
import { BadRequestError } from 'http-errors-enhanced'
import { getUsersByEmail } from '../../services/getUsersByEmail'
import {
  generateKey,
} from '../../../../utils'
import type {
  User,
  ValidatedEventAPIGatewayProxyEvent,
} from '../../../../utils'
import { middyfy } from '../../../../utils/lambda.util'
import { updateUserById } from '../../../../utils/db/users/updateById'
import { getUserFromDoc } from '../../utils/getUserFromDoc'
import { ONE_DAY_IN_SECONDS, parseSecondsToDays } from '../../../../utils/date/parseMillisecondsToDays'
import type { UserDocUpdater } from '../../types'
import type { userLoginReqSchema } from './schema'
import type { UserLoginRes } from '.'
import type { ApiRes } from '@/api/types'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof userLoginReqSchema, null> = async (
  event,
): Promise<APIGatewayProxyResult> => {
  const { email, password } = event.body

  const {
    isSuccess: existsUserEmail,
    result: userDocs,
  } = await getUsersByEmail(email)

  if (!existsUserEmail)
    throw new BadRequestError(`email ${email} is not registered, check your email address`)

  const userDoc = userDocs.find(user => compareSync(password, user.password))
  const passwordIsOk = Boolean(userDoc)

  if (!passwordIsOk)
    throw new BadRequestError('password not match, check your password')

  const secretKey = generateKey()
  const salt = generateKey()

  const userDocUpdater: UserDocUpdater = {
    secretKey,
    salt,
  }

  if (userDoc.status === 'pending')
    userDocUpdater.status = 'active'

  await updateUserById(userDoc.id, {
    secretKey,
    salt,
    status: 'active',
  })

  const secretSalt = salt + process.env.JWT_SECRET
  const expiresIn = ONE_DAY_IN_SECONDS
  const expiresInClient = parseSecondsToDays(expiresIn)
  const token = sign({ secretKey }, secretSalt, { expiresIn })
  const user: User = getUserFromDoc(userDoc)

  const res: ApiRes<UserLoginRes> = {
    response: {
      token,
      expiresIn: expiresInClient,
      user,
    },
  }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}

export const main = middyfy(handler)
