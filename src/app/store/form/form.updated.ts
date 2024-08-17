import {LayerSchema} from '@interfaces/layer-schema'
import {onFormUpdated} from '@store/selectors'
import {Schema} from '@interfaces/schema'
import {Canvas} from '@elements/canvas'
import {use} from '@websqnl/di'

onFormUpdated((value: Schema) => {
  const canvas = use(Canvas)
  const layer = use(LayerSchema)

  layer.logo
    .setSrc(value.logo ?? '')
    .render()
    .then(canvas.render)

  layer.background
    .setSrc(value.background ?? '')
    .render()
    .then(canvas.render)

  if (value.title) {
    layer.title.setText(value.title).render().then(canvas.render)
  }

  if (value.date) {
    layer.details.setDate(value.date).render()
  }

  if (value.time) {
    layer.details.setTime(value.time).render()
  }

  if (value.location) {
    layer.details.setLocation(value.location).render()
  }

  layer.grid
    .setSize(value.grid)
    .setActive(value.gridActive === true)
    .setOrder(20)
    .render()
    .then(canvas.render)

  layer.details.render().then(canvas.render)
})
