import type { PropsWithChildren } from 'react'
import './index.scss'

export default function AppContainer(props: PropsWithChildren) {
  return (
    <div className="ss-app-container">
      {props.children}
    </div>
  )
}
