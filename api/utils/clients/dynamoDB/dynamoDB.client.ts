import https from 'https'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export const createDBClient = () => {
  const agent = new https.Agent({
    keepAlive: true,
    maxSockets: Infinity,
  })

  return new DocumentClient({
    region: process.env.STAGE === 'dev' ? 'local' : 'us-east-1',
    endpoint: process.env.STAGE === 'dev' ? 'http://localhost:8000' : undefined,
    httpOptions: { agent },
  })
}
