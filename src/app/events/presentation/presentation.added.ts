import {LayerSchema} from '@interfaces/layer-schema'
import {FormControl} from '@interfaces/form-control'
import {use} from '@websqnl/di'

export const onPresentationAdded = () => {
  const control = use(FormControl)
  const layer = use(LayerSchema)

  if (layer.presentations.length < 2) {
    control.presentation.add.focus()
  } else {
    control.presentation.add.disabled = true
    const first = control.background.firstElementChild?.firstElementChild ?? []
    if (first instanceof HTMLInputElement) first.focus()
  }
}
