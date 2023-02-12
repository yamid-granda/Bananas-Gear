import type { UserLoginRes } from '@/api/modules/Users/functions/'
import type { ApiRes } from '@/app/clients/http'
import { httpPost } from '@/app/clients/http'
import { UsersApiPath } from '@/api/modules/Users/config'

interface LoginConfig {
  email: string
  password: string
}

export async function login(config: LoginConfig): Promise<ApiRes<UserLoginRes>> {
  return httpPost<UserLoginRes>(UsersApiPath.login, config)
}
