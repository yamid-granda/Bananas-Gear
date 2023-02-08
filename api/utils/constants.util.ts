import { stages } from './stages.enum'

export const STAGE: string = process.env.STAGE || stages.DEV
export const isLocalEnvironment = STAGE === stages.DEV
export const isOnlineEnvironment = !isLocalEnvironment // test or production deployed environments
export const IS_PRODUCTION = STAGE === stages.PRO
export const KEY_MAX_LENGTH = 32
