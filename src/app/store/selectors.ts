import {state} from './actions'

/**
 * Form
 */
export const onFormUpdated = state.select('form.updated')
export const onLogoUpdated = state.select('form.logo-updated')

/**
 * Presentation
 */
export const onPresentationSubmitted = state.select('presentation.submitted')
export const onPresentationHandled = state.select('presentation.handled')
export const onPresentationCreated = state.select('presentation.created')
export const onPresentationAdded = state.select('presentation.added')

/**
 * Sponsor
 */
export const onSponsorSelected = state.select('sponsor.selected')
export const onSponsorCreated = state.select('sponsor.created')
export const onSponsorAdded = state.select('sponsor.added')
