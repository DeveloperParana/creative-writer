import {Presentation, SubmittedPresentation} from './presentation'
import {PresentationLayer} from 'src/app/core/presentation-layer'
import {ImageLayer} from 'src/app/core/image-layer'
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
  'form.logo-updated': HTMLOptionElement
}
