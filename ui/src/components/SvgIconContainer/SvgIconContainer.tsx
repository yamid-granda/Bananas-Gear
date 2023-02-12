import type { PropsWithChildren } from 'react'

export default function SvgIconContainer(props: PropsWithChildren) {
  return (
    <svg
      className="ss-svg-icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {props.children}
    </svg>
  )
}
