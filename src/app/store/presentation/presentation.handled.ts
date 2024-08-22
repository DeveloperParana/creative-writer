import {onPresentationHandled} from '@store/selectors'
import {LayerSchema} from '@interfaces/layer-schema'
import {createPresentation} from '@store/actions'
import {PresentationLayer} from '../../core'
import {Config} from '@interfaces/config'
import {dispatch} from '@utils/state'
import {use} from '@websqnl/di'

onPresentationHandled((value) => {
  const config = use(Config)
  const layer = use(LayerSchema)

  const width = config.width
  const height = config.height / config.grid.tiles

  const y = height * (layer.presentations.length + 1) + 90

  const presentation = new PresentationLayer(0, y, width, height)

  presentation
    .setPhoto(value.photo)
    .setTitle(value.title)
    .setSpeaker(value.name, value.role)

  dispatch(createPresentation(presentation))
})
