import {determineCenter} from '@math/determine-center'
import {loadImageData} from '@utils/load-image-data'
import {LayerSchema} from '@interfaces/layer-schema'
import {onSponsorSelected} from '@store/selectors'
import {readDataFile} from '@utils/read-data-file'
import {determineSize} from '@math/determine-size'
import {createSponsor} from '@store/actions'
import {Config} from '@interfaces/config'
import {ImageLayer} from 'src/app/core'
import {dispatch} from '@utils/state'
import {use} from '@websqnl/di'

onSponsorSelected((file) => {
  const config = use(Config)
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
        dimension.height
      ).setSrc(logo.src)

      dispatch(createSponsor(sponsor))
    })
})
