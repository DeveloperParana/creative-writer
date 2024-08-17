import {LayerSchema} from '@interfaces/layer-schema'
import {onSponsorCreated} from '@store/selectors'
import {addSponsor} from '@store/actions'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

onSponsorCreated((sponsor) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)

  canvas.add(sponsor)
  layer.sponsors.push(sponsor)

  sponsor.render().then(() => {
    canvas.render()
    addSponsor(sponsor)
  })
})
