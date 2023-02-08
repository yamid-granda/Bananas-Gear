import { SES } from 'aws-sdk'
import type { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses'
import { InternalServerError } from 'http-errors-enhanced'
import { isOnlineEnvironment } from './constants.util'

export async function sendEmail(params: SendEmailRequest): Promise<SendEmailResponse> {
  if (isOnlineEnvironment) {
    const sender = new SES({ apiVersion: '2010-12-01' })
    return sender
      .sendEmail(params)
      .promise()
      .catch((error: Error) => {
        throw new InternalServerError(`AWS - SES: ${error.message}`)
      })
  }
  return {
    MessageId: '',
  }
}
