import type { MouseEvent, PropsWithChildren } from 'react'

export interface ButtonProps extends PropsWithChildren {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick}>
      {props.children}
    </button>
  )
}
