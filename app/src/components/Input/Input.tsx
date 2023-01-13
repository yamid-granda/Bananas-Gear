import type { ChangeEvent } from 'react'
import './Input.scss'

export interface InputProps {
  value: string
  setValue: (value: string) => void
}

export default function Input(props: InputProps) {
  function onInput(event: ChangeEvent<HTMLInputElement>) {
    props.setValue(event.target.value)
  }

  return (
    <div className="ss-input">
      <input
        className='ss-input__input'
        value={props.value}
        onInput={onInput}
      />
    </div>
  )
}
