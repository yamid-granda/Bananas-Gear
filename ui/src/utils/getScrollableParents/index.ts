import type { RefObject } from 'react'

function getNodeParents(node: Element | null, parents: Element[] = []): Element[] {
  if (!node)
    return parents

  return node.parentNode === null
    ? parents
    : getNodeParents(node.parentElement, parents.concat([node]))
}

const getNodeStyle = (node: Element, property: string) => getComputedStyle(node).getPropertyValue(property)

const getNodeOverflowStyleValues = (node: Element) => {
  const overflows = ['overflow', 'overflow-y', 'overflow-x']
  return overflows.reduce((styles: string, overflow: string) => styles + getNodeStyle(node, overflow), '')
}

const isNodeScrollable = (node: Element) => /(auto|scroll)/.test(getNodeOverflowStyleValues(node))

export function getScrollableParents(node: Element): Element[] {
  if (!(node instanceof HTMLElement || node instanceof SVGElement))
    return []

  const parents = getNodeParents(node.parentElement)
  const scrollableParents = parents.filter(parent => isNodeScrollable(parent))
  return scrollableParents
}
