import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import Button from '.'
import Modal from '@/ui/components/Modal'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Default: ComponentStory<typeof Button> = () => {
  const [isOpen, setIsOpen] = useState(false)

  function onButtonClick() {
    setIsOpen(true)
  }

  return (
    <>
      <Button onClick={onButtonClick}>
        Button Text
      </Button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        Hello World
      </Modal>
    </>
  )
}

export const Secondary: ComponentStory<typeof Button> = () => {
  const [isOpen, setIsOpen] = useState(false)

  function onButtonClick() {
    setIsOpen(true)
  }

  return (
    <>
      <Button
        variant='secondary'
        onClick={onButtonClick}
      >
        Button Text
      </Button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        Hello World
      </Modal>
    </>
  )
}
