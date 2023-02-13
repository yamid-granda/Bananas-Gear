import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '@/ui/components/Input'
import FormItem from '@/ui/components/FormItem'
import Button from '@/ui/components/Button'
import Card from '@/ui/components/Card'
import { login } from '@/app/modules/Login/services/auth'
import { useLoggedUser } from '@/app/hooks/loggedUser'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation('pages/login')

  const [, setLoggedUser] = useLoggedUser()

  const [form, setForm] = useReducer(
    (prev: LoginForm, next: Partial<LoginForm>) => ({ ...prev, ...next }), {
      email: '',
      password: '',
    },
  )

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoggingIn(true)
    const response = await login({ email: form.email, password: form.password })

    if (!response.isOk) {
      setIsLoggingIn(false)
      return
    }

    setLoggedUser({
      token: response.result.token,
      id: response.result.user.id,
      companyId: response.result.user.companyId,
      email: response.result.user.email,
      expiresIn: response.result.expiresIn,
    })

    navigate('/')

    setIsLoggingIn(false)
  }

  const title = t('title')

  return (
    <div className="ss-login">
      <Card>
        <form onSubmit={onSubmit}>
          <h1>{ title }</h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sapiente sint vero omnis maxime. Nisi aliquid quaerat laboriosam voluptatum quia sit ducimus, qui officia enim similique dicta sunt possimus quo!</p>

          <FormItem>
            <Input
              value={form.email}
              name="email"
              label="Email"
              onInput={email => setForm({ email })}
            />
          </FormItem>

          <FormItem>
            <Input
              value={form.password}
              name="password"
              label="Password"
              onInput={password => setForm({ password })}
              type="password"
            />
          </FormItem>

          <FormItem>
            <Button isLoading={isLoggingIn}>Login</Button>
          </FormItem>
        </form>
      </Card>
    </div>
  )
}
