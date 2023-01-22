import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { useMemo } from 'react'
import classNames from 'classnames'
import Portal from '@/ui/components/Portal'
import './index.scss'

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal(props: ModalProps) {
  const classes = useMemo(() => classNames({
    'ss-modal': true,
    'ss-modal--open': props.isOpen,
  }), [props.isOpen])

  function onOverlayClick() {
    props.setIsOpen(false)
  }

  return (
    <Portal>
      <div className={classes}>
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
