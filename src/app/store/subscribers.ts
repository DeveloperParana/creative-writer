import {onLogin, onLoginSuccess, onLoginError} from './selectors'
import {loginError, loginSuccess} from './actions'
import {dispatch} from '@utils/state'

onLogin(({username, password}) => {
  console.log(username, password)

  if (username === 'user' && password === 'pass') {
    dispatch(loginSuccess({accressToken: btoa(username + password)}))
  } else {
    dispatch(loginError(new DOMException('Login failure')))
  }
})

onLoginSuccess((value) => {
  console.log(value.accressToken)
})

onLoginError((value) => {
  console.log(value)
})
