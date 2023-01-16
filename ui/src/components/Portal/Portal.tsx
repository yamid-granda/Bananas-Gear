import type { PropsWithChildren } from 'react'
import { Portal as ReactPortal } from 'react-portal'

export default function Portal(props: PropsWithChildren) {
  return (
    <ReactPortal>
      {props.children}
    </ReactPortal>
  )
}
