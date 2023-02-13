import './index.scss'
import type { PropsWithChildren } from 'react'

export default function Card(props: PropsWithChildren) {
  return (
    <div className="ss-card">
      {props.children}
    </div>
  )
}
