import {Callback} from '@interfaces/common'

export class Action<T> {
  constructor(public type: string, public value: T) {}
}

export const action = <T>(type: string) => {
  return (value: T) => {
    return new (class extends Action<T> {
      constructor() {
        super(type, value)
      }
    })()
  }
}

const actions = new Map<string, Set<Callback<any>>>()

export const setAction = <T>(type: string, callback: Callback<T>) => {
  const callbacks = getAction<T>(type)
  actions.set(type, callbacks.add(callback))
}

export const getAction = <T>(type: string) => {
  return actions.get(type) ?? new Set<Callback<T>>()
}
