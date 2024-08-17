import {FormControl} from '@interfaces/form-control'
import {LayerSchema} from '@interfaces/layer-schema'
import {onPresentationAdded} from '@store/selectors'
import {use} from '@websqnl/di'

onPresentationAdded(() => {
  const control = use(FormControl)
  const layer = use(LayerSchema)

  if (layer.presentations.length < 2) {
    control.presentation.add.focus()
  } else {
    control.presentation.add.disabled = true
    const first = control.background.firstElementChild?.firstElementChild ?? []
    if (first instanceof HTMLInputElement) first.focus()
  }
})
