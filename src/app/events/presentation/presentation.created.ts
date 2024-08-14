import {PresentationLayer} from 'src/app/core/presentation-layer'
import {EventHandler} from '@interfaces/event-handler'
import {LayerSchema} from '@interfaces/layer-schema'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onPresentationCreated = (presentation: PresentationLayer) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)
  const handler = use(EventHandler)

  canvas.add(presentation)
  layer.presentations.push(presentation)

  presentation.render().then(() => {
    canvas.render()
    handler.emit('presentation.added', presentation)
  })
}
