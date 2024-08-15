import {Logged, Login} from './actions'
import {select} from '@utils/state'

export const onLogin = select<Login>('Login')
export const onLoginSuccess = select<Logged>('Login Success')
export const onLoginError = select<DOMException>('Login Error')
