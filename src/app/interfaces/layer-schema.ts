import type {
  DetailsLayer,
  GridLayer,
  ImageLayer,
  TextLayer,
  WordLayer,
} from 'src/app/core'
import type {PresentationSchema} from './presentation'

export abstract class DetailsSchema {
  abstract date: WordLayer
  abstract time: WordLayer
  abstract location: WordLayer
}

export abstract class LayerSchema {
  abstract grid: GridLayer
  abstract logo: ImageLayer
  abstract background: ImageLayer
  abstract title: TextLayer
  abstract details: DetailsLayer
  abstract presentations: PresentationSchema[]
  abstract sponsors: ImageLayer[]
  abstract devParana: ImageLayer
}
