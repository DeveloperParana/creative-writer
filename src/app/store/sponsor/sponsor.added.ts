import {FormControl} from '@interfaces/form-control'
import {LayerSchema} from '@interfaces/layer-schema'
import {onSponsorAdded} from '@store/selectors'
import {use} from '@websqnl/di'

onSponsorAdded(() => {
  const control = use(FormControl)
  const layer = use(LayerSchema)

  if (layer.sponsors.length < 2) {
    control.sponsor.button.focus()
  } else {
    control.sponsor.button.disabled = true
    const first = control.grid.firstElementChild?.firstElementChild ?? []
    if (first instanceof HTMLInputElement) first.focus()
  }
})
