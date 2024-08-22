import {Selector} from './select'

export class Action<T> {
  constructor(public type: string, public value: T) {}
}

export const action = <T extends string, V>(type: T) => {
  return (value: V) => {
    return new (class extends Action<V> {
      constructor() {
        super(type, value)
      }
    })()
  }
}

const actions = new Map<string, Set<Selector<any>>>()

export const addSelector = <T>(type: string, selector: Selector<T>) => {
  const selectors = getAction<T>(type)
  actions.set(type, selectors.add(selector))
}

export const removeSelector = <T>(type: string, selector: Selector<T>) => {
  const selectors = getAction<T>(type)
  selectors.delete(selector)
  actions.set(type, selectors)
}

export const getAction = <T>(type: string) => {
  return actions.get(type) ?? new Set<Selector<T>>()
}
