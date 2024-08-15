import {action} from '@utils/state'

export interface Login {
  username: string
  password: string
}

export interface Logged {
  accressToken: string
}

export const login = action<Login>('Login')
export const loginSuccess = action<Logged>('Login Success')
export const loginError = action<DOMException>('Login Error')
