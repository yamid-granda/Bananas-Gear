import type { ApiRes } from '@/api/types'
import type { UserLoginRes } from '@/api/modules/Users/functions/'
import { UsersApiPath } from '@/api/modules'
import { httpPost } from '@/ui/clients/http'

interface LoginConfig {
  email: string
  password: string
}

export function login(config: LoginConfig): Promise<ApiRes<UserLoginRes>> {
  return httpPost<UserLoginRes>(UsersApiPath.login, config)
}
