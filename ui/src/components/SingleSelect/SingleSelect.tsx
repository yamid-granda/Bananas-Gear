import type { KeyboardEvent, MouseEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import type { InputProps, InputRefs } from '@/components/Input/Input'
import Input from '@/components/Input/Input'
import type { HTMLInputEvent } from '@/ui/types'
import './SingleSelect.scss'
import Portal from '@/components/Portal/Portal'

export interface SingleSelectOption {
  value: string
  text: string
}

export interface SingleSelectProps extends InputProps {
  options: SingleSelectOption[]
  onChange?: (value: string, event?: HTMLInputEvent) => void
}

export default function SingleSelect(props: SingleSelectProps) {
  // data

  const [searchText, setSearchText] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMouseInOptions, setIsMouseInOptions] = useState<boolean>(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [searchRect, setSearchRect] = useState<Required<DOMRectInit>>({ height: 0, width: 0, x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // refs

  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<InputRefs>(null)

  // computed

  const selectedOption = useMemo(
    () => props.options.find(option => option.value === props.value) || null,
    [props.value],
  )

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

  const filteredOptionsCount = useMemo<number>(() => {
    return filteredOptions.length
  }, [filteredOptions.length])

  // watchers

  useEffect(() => {
    if (isMounted && !isOpen)
      onClose()
  }, [isOpen])

  useEffect(() => {
    setFocusedIndex(0)
  }, [filteredOptionsCount])

  // events

  function onChange(option: SingleSelectOption, event?: HTMLInputEvent): void {
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

    if (!selectedOption)
      setSearchText('')
  }

  function onSearchClick(event: MouseEvent<HTMLInputElement>): void {
    open()
    props.onClick && props.onClick(event)
  }

  function onSearchKeyDown({ key }: KeyboardEvent<HTMLInputElement>): void {
    toggleOpenByArrowKey(key)
    moveFocusedIndexByArrowKey(key)
    changeByArrowKey(key)

    if (!isSearching && key.length === 1)
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
    if (selectedOption && searchText !== selectedOption.text)
      setSearchText(selectedOption.text)
  }

  function onClickOutside() {
    if (isOpen)
      close()
  }

  // methods

  function open(): void {
    calculateSearchRect()
    setIsOpen(true)
  }

  function close(): void {
    setIsOpen(false)
    setIsSearching(false)
  }

  function calculateSearchRect(): void {
    const searchElement = searchRef.current?.ref.current

    if (!searchElement)
      return

    const rect = searchElement.getBoundingClientRect()
    setSearchRect(rect)
  }

  function getOptionClasses(index: number): string {
    return classNames({
      'ss-single-select__option': true,
      'ss-single-select__option--focused': focusedIndex === index,
    })
  }

  function moveFocusedIndexByArrowKey(key: string): void {
    if (!isOpen)
      return

    if (key === 'ArrowDown' && focusedIndex < filteredOptions.length - 1)
      setFocusedIndex(() => focusedIndex + 1)

    if (key === 'ArrowUp' && focusedIndex > 0)
      setFocusedIndex(() => focusedIndex - 1)
  }

  function toggleOpenByArrowKey(key: string): void {
    if (isOpen) {
      if (['Tab', 'Escape'].includes(key))
        close()

      return
    }

    if (['Enter', 'ArrowDown'].includes(key))
      open()
  }

  function changeByArrowKey(key: string): void {
    if (isOpen && key === 'Enter') {
      const option = filteredOptions[focusedIndex]
      onChange(option)
    }
  }

  function handleClickOutside(event: Event) {
    if (ref.current && !ref.current.contains(event.target as Node))
      onClickOutside()
  }

  // life cycle

  useEffect(() => {
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', handleClickOutside, true)

    const initialText = selectedOption?.text || ''
    setSearchText(initialText)

    calculateSearchRect()

    setIsMounted(true)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  // templates

  const optionsTemplate = useMemo(() => {
    return filteredOptions.map((option, index) => {
      return (
        <label
          className={getOptionClasses(index)}
          key={option.value}
          onClick={onOptionClick}
        >
          <input
            className="ss-single-select__input"
            type="radio"
            name={props.name}
            value={option.value}
            onChange={(event: HTMLInputEvent) => onChange(option, event)}
            checked={option.value === props.value}
          />

          <span className="ss-single-select__option--text">
            {option.text}
          </span>
        </label>
      )
    })
  }, [filteredOptions, focusedIndex])

  return (
    <div
      className="ss-single-select"
      ref={ref}
    >
      {/* Search */}
      <Input
        ref={searchRef}
        value={searchText}
        name={`${props.name}-search`}
        label={props.label}
        message={props.message}
        state={props.state}
        onInput={onSearch}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        onClick={onSearchClick}
        onKeyDown={onSearchKeyDown}
      />

      {/* Options */}
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
