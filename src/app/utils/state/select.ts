import {Callback} from '@interfaces/common'
import {setAction} from './action'

export const select = <T>(type: string) => {
  return (callback: Callback<T>) => {
    setAction(type, callback)
  }
}
