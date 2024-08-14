import {Presentation, SubmittedPresentation} from './presentation'
import {PresentationLayer} from '@models/presentation-layer'
import {ImageLayer} from '@models/image-layer'
import {Schema} from './schema'

export interface EventMap {
  'sponsor.created': ImageLayer
  'sponsor.selected': File

  'presentation.submitted': SubmittedPresentation
  'presentation.handled': Presentation
  'presentation.created': PresentationLayer
  'presentation.added': PresentationLayer

  'form.updated': Schema
}
