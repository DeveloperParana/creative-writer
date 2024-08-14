import {Config, EventHandler, LayerSchema} from '@interfaces'
import {determineCenter, determineSize} from '@math'
import {loadImageData, readDataFile} from '@utils'
import {ImageLayer} from 'src/app/core/image-layer'
import {use} from '@websqnl/di'

export const onSponsorSelected = (file: File) => {
  const config = use(Config)
  const handler = use(EventHandler)
  const layer = use(LayerSchema)

  readDataFile(file)
    .then(({data}) => data)
    .then(loadImageData)
    .then((logo) => {
      const dimension = determineSize(logo, {width: 300, height: 120})

      const center = determineCenter({width: 360, height: 180}, dimension)

      const offset = config.sponsor.w * layer.sponsors.length

      const sponsor = new ImageLayer(
        config.sponsor.x + center.width + offset,
        config.sponsor.y + center.height,
        dimension.width,
        dimension.height,
      ).setSrc(logo.src)

      handler.emit('sponsor.created', sponsor)
    })
}
