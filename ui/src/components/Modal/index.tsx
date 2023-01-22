import type { Dispatch, KeyboardEvent, PropsWithChildren, SetStateAction } from 'react'
import { useMemo } from 'react'
import classNames from 'classnames'
import Portal from '@/ui/components/Portal'
import './index.scss'

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal(props: ModalProps) {
  // data

  const classes = useMemo(() => classNames({
    'ss-modal': true,
    'ss-modal--open': props.isOpen,
  }), [props.isOpen])

  // events

  function onOverlayClick() {
    props.setIsOpen(false)
  }

  function onKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === 'Escape')
      props.setIsOpen(false)
  }

  return (
    <Portal>
      <div
        className={classes}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div
          className="ss-modal__overlay"
          onClick={onOverlayClick}
        ></div>
        <div className="ss-modal__content">
          {props.children}
        </div>
      </div>
    </Portal>
  )
}
