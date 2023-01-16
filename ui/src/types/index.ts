import type { ChangeEvent } from 'react'

// html
export type HTMLInputEvent = ChangeEvent<HTMLInputElement>

// globals
export type State = 'error' | 'success' | 'info' | 'warning'
