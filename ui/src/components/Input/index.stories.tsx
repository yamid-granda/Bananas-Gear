import { useState } from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Input from '.'
import FormItem from '@/ui/components/FormItem'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>

export const Default: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      name="Default"
      label='Input label'
      onInput={setValue}
    />
  )
}

export const InitialValue: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('Initial value')

  return (
    <Input
      value={value}
      name="InitialValue"
      onInput={setValue}
    />
  )
}

export const Message: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      name="Message"
      label="Label text"
      message='Remember, this input message is nice to show info to the user'
      onInput={setValue}
    />
  )
}

export const LongMessage: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      name="Message"
      label="Label text"
      message='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a voluptates amet quasi tempora minima impedit ratione nulla corporis quo pariatur atque, excepturi natus fuga rerum sapiente ducimus inventore provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a voluptates amet quasi tempora minima impedit ratione nulla corporis quo pariatur atque, excepturi natus fuga rerum sapiente ducimus inventore provident.'
      onInput={setValue}
    />
  )
}

export const ErrorState: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      name="ErrorState"
      label="Label text"
      state="error"
      onInput={setValue}
    />
  )
}

export const ErrorStateMessage: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      name="ErrorState"
      label="Label text"
      state="error"
      message='hello from message, this is a very long message, this is the line break'
      onInput={setValue}
    />
  )
}

export const MultipleAsForm: ComponentStory<typeof Input> = () => {
  const [form, setForm] = useState({
    input1: 'initial default value',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
    input8: '',
  })

  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi tempora odio quaerat optio a cupiditate incidunt! Eius a, eligendi voluptatum modi, quaerat dolor, dolorum molestias veritatis cum doloribus sequi incidunt!</p>

      <div>
        <FormItem>
          <Input
            value={form.input1}
            name="Multiple-1"
            label="Multiple-1"
            onInput={(value) => { setForm({ ...form, input1: value }) }}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.input2}
            name="Multiple-2"
            label="Multiple-2"
            onInput={(value) => { setForm({ ...form, input2: value }) }}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.input3}
            name="Multiple-3"
            label="Multiple-3"
            onInput={(value) => { setForm({ ...form, input3: value }) }}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.input4}
            name="Multiple-4"
            label="Multiple-4"
            onInput={(value) => { setForm({ ...form, input4: value }) }}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.input5}
            name="Multiple-5"
            label="Multiple-5"
            onInput={(value) => { setForm({ ...form, input5: value }) }}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.input6}
            name="Multiple-6"
            label="Multiple-6"
            message='hello from message, this is a very long message, this is the line break'
            onInput={(value) => { setForm({ ...form, input6: value }) }}
          />
        </FormItem>

        <FormItem>
          <Input
            value={form.input7}
            name="Multiple-7"
            label="Multiple-7"
            state="error"
            message='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a voluptates amet quasi tempora minima impedit ratione nulla corporis quo pariatur atque, excepturi natus fuga rerum sapiente ducimus inventore provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a voluptates amet quasi tempora minima impedit ratione nulla corporis quo pariatur atque, excepturi natus fuga rerum sapiente ducimus inventore provident.'
            onInput={(value) => { setForm({ ...form, input7: value }) }}
          />
        </FormItem>
      </div>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, culpa asperiores sunt nam, quaerat suscipit est qui tempora dolor quibusdam doloribus vel repellendus nobis sint quis ea unde incidunt nesciunt.</p>
    </div>
  )
}
