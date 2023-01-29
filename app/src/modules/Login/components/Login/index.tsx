import { useReducer } from 'react'
import Input from '@/ui/components/Input'
import FormItem from '@/ui/components/FormItem'
import Button from '@/ui/components/Button'

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

  return (
    <div className="ss-login">
      <form>
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
            value={form.email}
            name="password"
            label="Password"
            onInput={email => setForm({ email })}
          />
        </FormItem>

        <Button>Login</Button>
      </form>
    </div>
  )
}
