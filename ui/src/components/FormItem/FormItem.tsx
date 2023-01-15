import type { PropsWithChildren } from 'react'
import './FormItem.scss'

export default function FormItem(props: PropsWithChildren) {
  return (
    <div className="ss-form-item">
      {props.children}
    </div>
  )
}
