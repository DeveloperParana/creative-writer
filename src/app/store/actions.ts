import {EventMap} from '@interfaces/event-map'
import {store} from './store'

export const state = store<EventMap>()

/**
 * Form
 */
export const updateForm = state.action('form.updated')
export const updateLogo = state.action('form.logo-updated')
// export const updateForm = action<Schema>('form.updated')
// export const updateLogo = action<HTMLOptionElement>('form.logo-updated')

/**
 * Presentation
 */
export const submitPresentation = state.action('presentation.submitted')
// export const submitPresentation = action<SubmittedPresentation>(
//   'presentation.submitted'
// )

export const handlePresentation = state.action('presentation.handled')
// export const handlePresentation = action<Presentation>('presentation.handled')

export const createPresentation = state.action('presentation.created')
// export const createPresentation = action<PresentationLayer>(
//   'presentation.created'
// )

export const addPresentation = state.action('presentation.added')
// export const addPresentation = action<PresentationLayer>('presentation.added')

/**
 * Sponsor
 */
export const selectSponsor = state.action('sponsor.selected')

export const createSponsor = state.action('sponsor.created')

export const addSponsor = state.action('sponsor.added')
// export const selectSponsor = action<File>('sponsor.selected')

// export const createSponsor = action<ImageLayer>('sponsor.created')

// export const addSponsor = action<ImageLayer>('sponsor.added')
