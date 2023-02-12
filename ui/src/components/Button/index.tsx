import './index.scss'
import classNames from 'classnames'
import type { MouseEvent, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import Spinner from '../Spinner'

export interface ButtonProps extends PropsWithChildren {
  disabled?: boolean
  isLoading?: boolean
  variant?: 'secondary' | 'default'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: ButtonProps) {
  // computed

  const classes = useMemo(() => classNames({
    'ss-button': true,
    'ss-button--secondary': props.variant === 'secondary',
    'ss-button--disabled': props.disabled,
    'ss-button--loading': props.isLoading,
  }), [props.variant, props.disabled])

  const isLoadingTemplate = useMemo(() => {
    if (!props.isLoading)
      return null

    return (
      <div className="ss-button__loading">
        <Spinner />
      </div>
    )
  }, [props.isLoading])

  return (
    <button
      className={classes}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {isLoadingTemplate}
      <div className="ss-button__text">{props.children}</div>
    </button>
  )
}
