import type { DetailedHTMLProps, InputHTMLAttributes, MouseEvent, RefObject, KeyboardEvent } from 'react'
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import './Input.scss'
import classnames from 'classnames'
import type { HTMLInputEvent, State } from '@/ui/types'

type ReactInputProps = Omit<
  Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>,
  | 'onInput'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
>

export interface InputProps extends ReactInputProps {
  value: string
  name: string
  label?: string
  state?: State
  message?: string
  onInput?: (value: string, event: HTMLInputEvent) => void
  onFocus?: (event: HTMLInputEvent) => void
  onBlur?: (event: HTMLInputEvent) => void
  onClick?: (event: MouseEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

export interface InputRefs {
  ref: RefObject<HTMLInputElement>
  inputRef: RefObject<HTMLInputElement>
}

const Input = forwardRef<InputRefs, InputProps>((props, forwardedRef) => {
  // data

  const [isFocused, setIsFocused] = useState<boolean>(false)

  // refs

  const ref = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // computed

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

  // events

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

  // templates

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

  // config

  useImperativeHandle(forwardedRef, () => ({
    ref,
    inputRef,
  }))

  return (
    <div
      className={classes}
      ref={ref}
    >
      <div className="ss-input__wrap">
        <input
          ref={inputRef}
          className='ss-input__input'
          value={props.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
        />

        {labelTemplate}
      </div>

      {messageTemplate}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
