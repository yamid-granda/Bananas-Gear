import type { FormEvent } from 'react'
import { useReducer, useState } from 'react'
import Input from '@/ui/components/Input'
import FormItem from '@/ui/components/FormItem'
import Button from '@/ui/components/Button'
import { login } from '@/app/modules/Login/services/auth'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const [form, setForm] = useReducer(
    (prev: LoginForm, next: Partial<LoginForm>) => ({ ...prev, ...next }),
    {
      email: '',
      password: '',
    },
  )

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoggingIn(true)
    const response = await login({ email: form.email, password: form.password })

    console.log(response)

    // if (response.)

    setIsLoggingIn(false)
  }

  return (
    <div className="ss-login">
      <form onSubmit={onSubmit}>
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

        <Button isLoading={isLoggingIn}>Login</Button>
      </form>
    </div>
  )
}
