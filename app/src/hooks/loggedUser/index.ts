import { useMemo } from 'react'
import { createGlobalState } from 'react-hooks-global-state'

interface LoggedUser {
  id: string
  companyId: string
  email: string
  token: string
  expiresIn: number
}

interface LoggedUserState {
  loggedUser: LoggedUser
}

const { useGlobalState } = createGlobalState<LoggedUserState>({
  loggedUser: {
    id: '',
    companyId: '',
    email: '',
    token: '',
    expiresIn: 0,
  },
})

export const useLoggedUser = () => useGlobalState('loggedUser')

export const useHasLoggedUser: () => boolean = () => {
  const [loggedUser] = useLoggedUser()
  return useMemo(() => loggedUser.token !== '', [loggedUser])
}
