import type { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { useMemo, useState } from 'react'
import './Input.scss'
import classnames from 'classnames'
import type { State } from '@/ui/types'

type ReactInputProps = Omit<
  Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>,
  | 'onInput'
  | 'onFocus'
  | 'onBlur'
>

type HTMLInputEvent = ChangeEvent<HTMLInputElement>

export interface InputProps extends ReactInputProps {
  value: string
  name: string
  label?: string
  state?: State
  message?: string
  onInput?: (value: string, event: HTMLInputEvent) => void
  onFocus?: (event: HTMLInputEvent) => void
  onBlur?: (event: HTMLInputEvent) => void
}

export default function Input(props: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const classes = useMemo(() => classnames({
    'ss-input': true,
    'ss-input--focus': isFocused,
    'ss-input--active': props.value,
    'ss-input--error': props.state === 'error',
  }), [
    isFocused,
    props.value,
    props.state,
  ])

  function onInput(event: HTMLInputEvent) {
    props.onInput && props.onInput(event.target.value, event)
  }

  function onFocus(event: HTMLInputEvent) {
    setIsFocused(true)
    props.onFocus && props.onFocus(event)
  }

  function onBlur(event: HTMLInputEvent) {
    setIsFocused(false)
    props.onBlur && props.onBlur(event)
  }

  const labelTemplate = useMemo(() => {
    if (!props.label)
      return null

    return (
      <label
        className='ss-input__label'
        htmlFor={props.name}
      >
        <span className='ss-input__label-text'>{props.label}</span>
      </label>
    )
  }, [props.label])

  const messageTemplate = useMemo(() => {
    if (!props.message)
      return null

    return (
      <div className='ss-input__message'>
        <span className='ss-input__message-text'>{props.message}</span>
      </div>
    )
  }, [props.message])

  return (
    <div className={classes}>
      <div className="ss-input__wrap">
        <input
          className='ss-input__input'
          value={props.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {labelTemplate}
      </div>

      {messageTemplate}
    </div>
  )
}
