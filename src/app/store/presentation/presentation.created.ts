import {onPresentationCreated} from '@store/selectors'
import {LayerSchema} from '@interfaces/layer-schema'
import {addPresentation} from '@store/actions'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

onPresentationCreated((presentation) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)

  canvas.add(presentation)
  layer.presentations.push(presentation)

  presentation.render().then(() => {
    canvas.render()
    addPresentation(presentation)
  })
})
