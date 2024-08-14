import {EventHandler} from '@interfaces/event-handler'
import {LayerSchema} from '@interfaces/layer-schema'
import {ImageLayer} from '@models/image-layer'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

export const onSponsorCreated = (sponsor: ImageLayer) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)
  const handler = use(EventHandler)

  canvas.add(sponsor)
  layer.sponsors.push(sponsor)

  sponsor.render().then(() => {
    canvas.render()
    handler.emit('sponsor.added', sponsor)
  })
}
