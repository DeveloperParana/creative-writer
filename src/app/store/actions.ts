import {Presentation, SubmittedPresentation} from '@interfaces/presentation'
import {ImageLayer, PresentationLayer} from '../core'
import {Schema} from '@interfaces/schema'
import {action} from '@utils/state'

/**
 * Form
 */
export const updateForm = action<Schema>('form.updated')

/**
 * Presentation
 */
export const submitPresentation = action<SubmittedPresentation>(
  'presentation.submitted'
)

export const handlePresentation = action<Presentation>('presentation.handled')

export const createPresentation = action<PresentationLayer>(
  'presentation.created'
)

export const addPresentation = action<PresentationLayer>('presentation.added')

/**
 * Sponsor
 */
export const selectSponsor = action<File>('sponsor.selected')

export const createSponsor = action<ImageLayer>('sponsor.created')

export const addSponsor = action<ImageLayer>('sponsor.added')
