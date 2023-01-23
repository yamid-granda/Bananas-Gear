import type { KeyboardEvent, MouseEvent, Reducer } from 'react'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import classNames from 'classnames'
import type { InputProps, InputRefs } from '@/ui/components/Input'
import Input from '@/ui/components/Input'
import type { HTMLInputEvent } from '@/ui/types'
import './index.scss'
import Portal from '@/ui/components/Portal'
import { getScrollableParents } from '@/ui/utils/getScrollableParents'

export interface SingleSelectOption {
  value: string
  text: string
}

export type SingleSelectValue = string | null

export interface SingleSelectProps extends Omit<InputProps, 'value'> {
  value: string | null
  options: SingleSelectOption[]
  onChange?: (value: string, event?: HTMLInputEvent) => void
}

export default function SingleSelect(props: SingleSelectProps) {
  // data

  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [searchRect, setSearchRect] = useState<Required<DOMRectInit>>({ height: 0, width: 0, x: 0, y: 0 })
  const [isOptionsContainerInTop, setIsOptionsContainerInTop] = useState(false)
  const [scrollableParents, setScrollableParents] = useState<Element[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [prevSearch, setPrevSearch] = useState('')

  const [searchText, setSearchText] = useReducer<Reducer<string, string>>((prev, next) => {
    setPrevSearch(prev)
    return next
  }, props.value || '')

  // refs

  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<InputRefs>(null)
  const optionsRefs = useRef<HTMLLabelElement[]>([])
  const optionsContainerRef = useRef<HTMLDivElement>(null)
  const optionsWrapRef = useRef<HTMLDivElement>(null)

  // computed

  const selectedOption = useMemo(
    () => props.options.find(option => option.value === props.value) || null,
    [props.value],
  )

  const optionsContainerClasses = useMemo(() => {
    return classNames({
      'ss-single-select__options': true,
      'ss-single-select__options--open': isOpen,
    })
  }, [isOpen, isOptionsContainerInTop])

  const optionsWrapClasses = useMemo(() => {
    return classNames({
      'ss-single-select__options-wrap': true,
      'ss-single-select__options-wrap--top': isOptionsContainerInTop,
    })
  }, [isOptionsContainerInTop])

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

  const optionsContainerStyles = useMemo(() => {
    const { x, y, width, height } = searchRect
    const top = y + height
    const left = x

    return {
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
      transform: 'translateY(-100%)',
    }
  }, [searchRect])

  const filteredOptionsCount = useMemo<number>(() => filteredOptions.length, [filteredOptions.length])

  // watchers

  useEffect(() => {
    setFocusedIndex(0)
  }, [filteredOptionsCount])

  useEffect(() => {
    if (!isMounted)
      return

    onChangeFocusedOption()
  }, [focusedIndex])

  useEffect(() => {
    if (isMounted)
      isOpen ? onOpen() : onClose()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('click', handleClickOutside, true)

    if (!isOpen && !selectedOption)
      setSearchText('')

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isOpen])

  // useEffect((param) => {
  //   if(!isSearching)
  // }, [isSearching, searchText])

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

    if (!isOpen)
      return

    const optionsContainer = optionsContainerRef.current

    if (!optionsContainer)
      return

    const isContainerOutScreen: boolean = optionsContainer.getBoundingClientRect().bottom > window.innerHeight
    setIsOptionsContainerInTop(isContainerOutScreen)
  }

  function onResize(): void {
    calculateSearchRect()
  }

  function onSearchFocus(): void {
    open()
  }

  function onSearchClick(event: MouseEvent<HTMLInputElement>): void {
    open()
    props.onClick && props.onClick(event)
  }

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (isOpen)
      event.stopPropagation()

    const { key } = event
    toggleOpenByArrowKey(key)
    moveFocusedIndexByArrowKey(key)
    changeByArrowKey(key)

    if (!isSearching && key.length === 1)
      setSearchText('')

    // android keyboard support
    else if (key === 'Unidentified' && !isSearching && searchText !== prevSearch)
      setSearchText('')
  }

  function onOptionClick(): void {
    close()
  }

  function onClose(): void {
    setSelectedOptionText()
    unListenScrollableParents()
  }

  function onOpen(): void {
    calculateSearchRect()
    listenScrollableParents()
  }

  function onClickOutside() {
    if (isOpen)
      close()
  }

  function onChangeFocusedOption() {
    const option = optionsRefs.current[focusedIndex]

    if (!option)
      return

    option.scrollIntoView({ block: 'nearest' })
  }

  function onMounted(): void {
    setSearchText(selectedOption?.text || '')
    calculateSearchRect()
    setIsMounted(true)
  }

  function beforeUnmount(): void {
    document.removeEventListener('click', handleClickOutside, true)
  }

  // methods

  function open(): void {
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
    const target = event.target as Node
    const searchElement = ref.current
    const optionsElement = optionsContainerRef.current
    const hasElements = searchElement && optionsElement

    if (!hasElements)
      return

    const isClickOut = !(searchElement.contains(target) || optionsElement.contains(target))

    if (isClickOut)
      onClickOutside()
  }

  function listenScrollableParents(): void {
    const element = ref.current

    if (!element)
      return

    const scrollableParents = getScrollableParents(element)
    setScrollableParents(scrollableParents)
    scrollableParents.forEach(parent => parent.addEventListener('scroll', onScroll, { passive: true }))
  }

  function unListenScrollableParents(): void {
    scrollableParents.forEach(parent => parent.removeEventListener('scroll', onScroll))
    setScrollableParents([])
  }

  function setSelectedOptionText(): void {
    const requiresSetSelectedOptionText = selectedOption && searchText !== selectedOption.text

    if (requiresSetSelectedOptionText)
      setSearchText(selectedOption.text)
  }

  // life cycle

  useEffect(() => {
    onMounted()

    return () => {
      beforeUnmount()
    }
  }, [])

  // templates

  const optionsTemplate = useMemo(() => {
    return filteredOptions.map((option, index) => {
      return (
        <label
          className={getOptionClasses(index)}
          key={option.value}
          ref={(el: HTMLLabelElement) => optionsRefs.current[index] = el}
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
        onClick={onSearchClick}
        onKeyDown={onSearchKeyDown}
      />

      {/* Options */}
      <Portal>
        <div
          ref={optionsContainerRef}
          className={optionsContainerClasses}
          style={{
            top: optionsContainerStyles.top,
            left: optionsContainerStyles.left,
            width: optionsContainerStyles.width,
          }}
        >
          <div
            className={optionsWrapClasses}
            ref={optionsWrapRef}
          >
            {optionsTemplate}
          </div>
        </div>
      </Portal>
    </div>
  )
}
