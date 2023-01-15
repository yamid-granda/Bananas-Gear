import React, { useState } from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Input from './Input'
import FormItem from '@/ui/components/FormItem/FormItem'

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

export const WithLabel: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      name="WithLabel"
      label='Label text'
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
      label='Label text'
      state="error"
      onInput={setValue}
    />
  )
}

export const MultipleAsForm: ComponentStory<typeof Input> = () => {
  const [form, setForm] = useState({
    input1: '',
    input2: 'default value',
    input3: '',
    input4: '',
    input5: '',
  })

  return (
    <div>
      <FormItem>
        <Input
          value={form.input1}
          name="Multiple-1"
          label='Multiple-1'
          onInput={(value) => { setForm({ ...form, input1: value }) }}
        />
      </FormItem>

      <FormItem>
        <Input
          value={form.input2}
          name="Multiple-2"
          label='Multiple-2'
          onInput={(value) => { setForm({ ...form, input2: value }) }}
        />
      </FormItem>

      <FormItem>
        <Input
          value={form.input3}
          name="Multiple-3"
          label='Multiple-3'
          onInput={(value) => { setForm({ ...form, input3: value }) }}
        />
      </FormItem>

      <FormItem>
        <Input
          value={form.input4}
          name="Multiple-4"
          label='Multiple-4'
          onInput={(value) => { setForm({ ...form, input4: value }) }}
        />
      </FormItem>

      <FormItem>
        <Input
          value={form.input5}
          name="Multiple-5"
          label='Multiple-5'
          onInput={(value) => { setForm({ ...form, input5: value }) }}
        />
      </FormItem>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  )
}
