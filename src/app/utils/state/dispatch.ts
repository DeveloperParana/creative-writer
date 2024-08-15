import {Action, getAction} from './action'

export const dispatch = <T>(action: Action<T>) => {
  for (const callback of getAction(action.type)) {
    callback(action.value)
  }
}
