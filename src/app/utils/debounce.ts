import {timeout} from './timeout'

type Fn = (...params: any[]) => any

export const debounce = <T extends Fn>(fn: T, wait = 1000) => {
  let timeoutRef: VoidFunction
  return function execFn<E>(ev: E) {
    const later = () => {
      timeoutRef()
      fn(ev)
    }
    timeoutRef()
    timeoutRef = timeout(later, wait)
  }
}
