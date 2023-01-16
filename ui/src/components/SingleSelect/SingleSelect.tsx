import type { KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import type { InputRefs } from '@/components/Input/Input'
import Input from '@/components/Input/Input'
import type { HTMLInputEvent } from '@/ui/types'
import './SingleSelect.scss'
import Portal from '@/components/Portal/Portal'

export interface SingleSelectOption {
  value: string
  text: string
}

export interface SingleSelectProps {
  options: SingleSelectOption[]
  name: string
  value: string
  onChange?: (value: string, event: HTMLInputEvent) => void
}

export default function SingleSelect(props: SingleSelectProps) {
  // data

  const [selectedOption, setSelectedOption] = useState<SingleSelectOption | null>(null)
  const [searchText, setSearchText] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMouseInOptions, setIsMouseInOptions] = useState<boolean>(false)
  const [searchRect, setSearchRect] = useState<Required<DOMRectInit>>({ height: 0, width: 0, x: 0, y: 0 })

  // refs

  const searchRef = useRef<InputRefs>(null)

  // computed

  const optionsClasses = useMemo(() => {
    return classNames({
      'ss-single-select__options': true,
      'ss-single-select__options--open': isOpen,
    })
  }, [isOpen])

  const filteredOptions = useMemo<SingleSelectOption[]>(() => {
    if (!isSearching)
      return props.options

    return props.options.filter((option) => {
      const optionTextLower = option.text.toLowerCase()
      const searchTextLower = searchText.toLocaleLowerCase()
      return optionTextLower.includes(searchTextLower)
    })
  }, [
    searchText,
    isSearching,
    props.options,
  ])

  const optionsStyle = useMemo(() => {
    const { x, y, width, height } = searchRect
    const top = y + height
    const left = x

    return {
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
    }
  }, [searchRect])

  // watchers

  useEffect(() => {
    if (!isOpen)
      onClose()
  }, [isOpen])

  // events

  function onChange(option: SingleSelectOption, event: HTMLInputEvent): void {
    setIsSearching(false)
    setSelectedOption(option)
    setSearchText(option.text)
    searchRef.current?.inputRef.current?.focus()
    close()
    props.onChange && props.onChange(option.value, event)
  }

  function onSearch(value: string): void {
    setIsSearching(true)
    setSearchText(value)
    open()
  }

  function onScroll(): void {
    calculateSearchRect()
  }

  function onSearchFocus(): void {
    open()
  }

  function onSearchBlur(): void {
    if (!isMouseInOptions)
      close()
  }

  function onSearchClick(): void {
    open()
  }

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Tab') {
      close()
      return
    }

    if (!isSearching)
      setSearchText('')
  }

  function onMouseEnterInOptions(): void {
    setIsMouseInOptions(true)
  }

  function onMouseLeaveFromOptions(): void {
    setIsMouseInOptions(false)
  }

  function onOptionClick(): void {
    close()
  }

  function onClose(): void {
    setSearchText(selectedOption?.text || '')
  }

  // methods

  function open(): void {
    setIsOpen(true)
  }

  function close(): void {
    setIsSearching(false)
    setIsOpen(false)
  }

  function calculateSearchRect(): void {
    const searchElement = searchRef.current?.ref.current

    if (!searchElement)
      return

    const rect = searchElement.getBoundingClientRect()
    setSearchRect(rect)
  }

  // life cycle

  useEffect(() => {
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    calculateSearchRect()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // templates

  const optionsTemplate = useMemo(() => {
    return filteredOptions.map((option) => {
      return (
        <label
          className="ss-single-select__option"
          key={option.value}
          onClick={onOptionClick}
        >
          <input
            className="ss-single-select__input"
            type="radio"
            name={props.name}
            value={option.value}
            onChange={(event: HTMLInputEvent) => onChange(option, event)}
          />

          <span className="ss-single-select__option--text">
            {option.text}
          </span>
        </label>
      )
    })
  }, [filteredOptions])

  return (
    <div className="ss-single-select">
      {JSON.stringify(selectedOption)}
      <Input
        ref={searchRef}
        value={searchText}
        name={`${props.name}-search`}
        onInput={onSearch}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        onClick={onSearchClick}
        onKeyDown={onSearchKeyDown}
      />

      <Portal>
        <div
          className={optionsClasses}
          style={{
            top: optionsStyle.top,
            left: optionsStyle.left,
            width: optionsStyle.width,
          }}
          onMouseEnter={onMouseEnterInOptions}
          onMouseLeave={onMouseLeaveFromOptions}
        >
          <div className="ss-single-select__options-wrap">
            {optionsTemplate}
          </div>
        </div>
      </Portal>
    </div>
  )
}
