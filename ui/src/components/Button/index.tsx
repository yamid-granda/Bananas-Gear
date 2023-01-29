import classNames from 'classnames'
import type { MouseEvent, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import './index.scss'

export interface ButtonProps extends PropsWithChildren {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  variant?: 'secondary'
}

export default function Button(props: ButtonProps) {
  // computed

  const classes = useMemo(() => classNames({
    'ss-button': true,
    'ss-button--secondary': props.variant === 'secondary',
  }), [props.variant])

  return (
    <button
      className={classes}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
