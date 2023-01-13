import React, { useState } from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Input from './Input'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = args => <Input {...args} />
// const Template: ComponentStory<typeof Input> = () => {
//   const [inputValue, setInputValue] = useState('jazz')

//   return (
//     <Input
//       value={inputValue}
//       onInput={setInputValue}
//     />
//   )
// }

// export const Primary = Template.bind({})

// export const Primary = Template.bind(() => {
//   const [inputValue, setInputValue] = useState('jazz')

//   return (
//     <Input
//       value={inputValue}
//       onInput={setInputValue}
//     />
//   )
// })

// export const Primary: ComponentStory<typeof Input> = (args) => {
//   const [inputValue, setInputValue] = useState(args.value)

//   return (
//     <Input
//       {...args}
//       value={inputValue}
//       onInput={setInputValue}
//     />
//   )
// }

export const Primary: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState(args.value)

  return (
    <Input
      value={inputValue}
      onInput={setInputValue}
    />
  )
}

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: 'hello',
}

export const Secondary = Template.bind({})
Secondary.args = {
  // label: 'Input',
}

export const Large = Template.bind({})
Large.args = {
  // size: 'large',
  // label: 'Input',
}

export const Small = Template.bind({})
Small.args = {
  // size: 'small',
  // label: 'Input',
}
