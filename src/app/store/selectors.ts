import {Presentation, SubmittedPresentation} from '@interfaces/presentation'
import {ImageLayer, PresentationLayer} from '../core'
import {Schema} from '@interfaces/schema'
import {select} from '@utils/state'


/**
 * Form
 */
export const onFormUpdated = select<Schema>('form.updated')

/**
 * Presentation
 */
export const onPresentationSubmitted = select<SubmittedPresentation>(
  'presentation.submitted'
)

export const onPresentationHandled = select<Presentation>(
  'presentation.handled'
)

export const onPresentationCreated = select<PresentationLayer>(
  'presentation.created'
)

export const onPresentationAdded =
  select<PresentationLayer>('presentation.added')

/**
 * Sponsor
 */
export const onSponsorSelected = select<File>('sponsor.selected')
export const onSponsorCreated = select<ImageLayer>('sponsor.created')
export const onSponsorAdded = select<ImageLayer>('sponsor.added')
