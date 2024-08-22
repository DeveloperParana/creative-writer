import {onLogoUpdated} from '@store/selectors'

onLogoUpdated(({text, value}) => {
  console.log(text, value)
})
