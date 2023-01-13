import type { ChangeEvent } from 'react'
import './Input.scss'

export interface InputProps {
  value: string
  onInput: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: InputProps) {
  function onInputInput(event: ChangeEvent<HTMLInputElement>) {
    props.onInput(event.target.value, event)
  }

  return (
    <div className="ss-input">
      <input
        {...props}
        className='ss-input__input'
        value={props.value}
        onInput={onInputInput}
      />
    </div>
  )
}
