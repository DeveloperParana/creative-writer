import {addSelector, removeSelector} from './action'

export interface Selector<T> {
  (value: T): void
}

export const select = <T>(type: string) => {
  return (selector: Selector<T>) => {
    addSelector(type, selector)
    return () => removeSelector(type, selector)
  }
}
