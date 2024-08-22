import {EventMap} from '@interfaces/event-map'
import {store} from './store'

export const state = store<EventMap>()

/**
 * Form
 */
export const updateForm = state.action('form.updated')
export const updateLogo = state.action('form.logo-updated')

/**
 * Presentation
 */
export const submitPresentation = state.action('presentation.submitted')
export const handlePresentation = state.action('presentation.handled')
export const createPresentation = state.action('presentation.created')
export const addPresentation = state.action('presentation.added')

/**
 * Sponsor
 */
export const selectSponsor = state.action('sponsor.selected')
export const createSponsor = state.action('sponsor.created')
export const addSponsor = state.action('sponsor.added')
