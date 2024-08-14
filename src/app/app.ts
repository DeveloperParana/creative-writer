import {EventHandler, FormControl, LayerSchema, Schema} from '@interfaces'
import {onSponsorCreated, onSponsorSelected} from '@events/sponsor'
import {Form, Canvas, Sidenav, Accordion, DownloadButton} from '@elements'
import {PresentationForm} from '@components/presentation'
import {onFormChange} from '@events'
import {use} from '@websqnl/di'
import {h} from '@utils'
import {
  onPresentationCreated,
  onPresentationHandled,
  onPresentationSubmitted,
} from '@events/presentation'

export const loadApp = (container: HTMLElement) => {
  const canvas = use(Canvas)

  const sidenav = use(Sidenav)

  const layer = use(LayerSchema)
  const control = use(FormControl)

  const handler = use(EventHandler)

  const accordion = new Accordion()

  /**
   *  ___ _ __   ___  _ __  ___  ___  _ __
   * / __| '_ \ / _ \| '_ \/ __|/ _ \| '__|
   * \__ \ |_) | (_) | | | \__ \ (_) | |
   * |___/ .__/ \___/|_| |_|___/\___/|_|
   *     |_|
   */
  control.sponsor.input.onchange = () => {
    const [file] = control.sponsor.input.files ?? []
    handler.emit('sponsor.selected', file)
  }

  handler.on('sponsor.selected', onSponsorSelected)
  handler.on('sponsor.created', onSponsorCreated)

  control.sponsor.button.onclick = () => {
    control.sponsor.input.click()
  }

  const form = new Form<Schema>(() => {
    handler.emit('form.updated', form.value)
  })

  handler.on('form.updated', onFormChange)

  /**
   *                                 _        _   _
   *  _ __  _ __ ___  ___  ___ _ __ | |_ __ _| |_(_) ___  _ __
   * | '_ \| '__/ _ \/ __|/ _ \ '_ \| __/ _` | __| |/ _ \| '_ \
   * | |_) | | |  __/\__ \  __/ | | | || (_| | |_| | (_) | | | |
   * | .__/|_|  \___||___/\___|_| |_|\__\__,_|\__|_|\___/|_| |_|
   * |_|
   */

  control.presentation.add.onclick = () => {
    const form = new PresentationForm()
    const label = `Presentation ${accordion.items.length + 1}`
    accordion.add(label, form)

    form.onsubmit = (ev) => {
      ev.preventDefault()
      handler.emit('presentation.submitted', form.value)
    }
  }

  handler.on('presentation.submitted', onPresentationSubmitted)
  handler.on('presentation.handled', onPresentationHandled)
  handler.on('presentation.created', onPresentationCreated)

  // layer.grid.setSize(config.grid.tile).setOrder(10).render()

  layer.background.setDraggable(false).setSrc(form.value.logo).render()

  layer.logo.setOrder(4).setSrc('logo.svg').render()

  layer.title
    .setText(control.title.value)
    .setSize(78)
    .setColor('white')
    .render()

  canvas.add(
    layer.grid,
    layer.logo,
    layer.background,
    layer.title,
    layer.details,
  )

  const dateTime = h(
    'div',
    {className: 'form-group'},
    control.date,
    control.time,
  )

  form.append(
    control.title,
    dateTime,
    control.location,
    control.logo,
    control.presentation.add,
    accordion,
    control.background,
    control.sponsor.button,
    control.grid,
  )

  sidenav.add(form)

  const main = h('main')

  const download = new DownloadButton(canvas)

  main.append(canvas)

  container.append(main, sidenav, download)
}
