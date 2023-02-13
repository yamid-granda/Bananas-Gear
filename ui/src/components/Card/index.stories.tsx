import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { useReducer } from 'react'
import FormItem from '../FormItem'
import Input from '../Input'
import Button from '../Button'
import Card from '.'

interface LoginForm {
  email: string
  password: string
}

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>

export const Default: ComponentStory<typeof Card> = () => {
  return (
    <Card>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sint libero temporibus minima debitis blanditiis vel laudantium vero ea obcaecati dolores, sapiente ut cum sed beatae officia quis tenetur omnis?
    </Card>
  )
}

export const ShortText: ComponentStory<typeof Card> = () => {
  return (
    <Card>
      Short text
    </Card>
  )
}

export const FormExample: ComponentStory<typeof Card> = () => {
  const [form, setForm] = useReducer(
    (prev: LoginForm, next: Partial<LoginForm>) => ({ ...prev, ...next }), {
      email: '',
      password: '',
    },
  )

  return (
    <Card>
      <form>
        <h1>Lorem</h1>

        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi ea cumque minima blanditiis earum assumenda quibusdam dolore voluptas facere obcaecati. Laudantium maxime repudiandae exercitationem similique dolore reiciendis tempora quasi in.t</div>

        <FormItem>
          <Input
            value={form.email}
            name='email'
            label='Email'
            onInput={email => setForm({ email })}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.password}
            name='password'
            label='Password'
            onInput={password => setForm({ email: password })}
          />
        </FormItem>

        <FormItem>
          <Button>Login</Button>
        </FormItem>
      </form>
    </Card>
  )
}
