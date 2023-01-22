import type { PropsWithChildren } from 'react'
import './index.scss'

export default function FormItem(props: PropsWithChildren) {
  return (
    <div className="ss-form-item">
      {props.children}
    </div>
  )
}
