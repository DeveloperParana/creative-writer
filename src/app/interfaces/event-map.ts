import {Presentation, SubmittedPresentation} from './presentation'
import {PresentationLayer} from '@models/presentation-layer'
import {ImageLayer} from '@models/image-layer'
import {Schema} from './schema'

export interface EventMap {
  'sponsor.selected': File
  'sponsor.created': ImageLayer
  'sponsor.added': ImageLayer

  'presentation.submitted': SubmittedPresentation
  'presentation.handled': Presentation
  'presentation.created': PresentationLayer
  'presentation.added': PresentationLayer

  'form.updated': Schema
}
