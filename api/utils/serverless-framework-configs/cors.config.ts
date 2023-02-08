import { IS_PRODUCTION_DEPLOY } from '.'

export const CORS_ORIGINS = ['https://goalflags.com', 'https://app.goalflags.com']

const corsConfig = {
  origins: CORS_ORIGINS,
}

export const cors = IS_PRODUCTION_DEPLOY ? corsConfig : true
