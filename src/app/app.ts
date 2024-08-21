import {Form, Canvas, Sidenav, Accordion, DownloadButton} from '@elements'
import {selectSponsor, submitPresentation, updateForm} from '@store'
import {FormControl, LayerSchema, Schema} from '@interfaces'
import {PresentationForm} from '@components/presentation'
import {ThemeToggle} from '@components/theme'
import {TitleBar} from '@elements/title-bar'
import {dispatch, h} from '@utils'
import {use} from '@websqnl/di'

// dispatch(login({username: 'user', password: 'pass'}))

export const loadApp = (container: HTMLElement) => {
  const canvas = use(Canvas)

  const sidenav = use(Sidenav)

  const layer = use(LayerSchema)
  const control = use(FormControl)

  const accordion = new Accordion()

  const theme = use(ThemeToggle)

  const download = new DownloadButton(canvas)

  const titleBar = new TitleBar('Escritor Criativo')

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

    const item = accordion.add(label, form)

    item.openSection()

    form.controls.title.element.focus()

    form.onsubmit = (ev) => {
      ev.preventDefault()

      dispatch(submitPresentation(form.value))
      // handler.emit('presentation.submitted', form.value)

      accordion.closeAll()
    }
  }

  // handler.on('presentation.submitted', onPresentationSubmitted)
  // handler.on('presentation.handled', onPresentationHandled)
  // handler.on('presentation.created', onPresentationCreated)
  // handler.on('presentation.added', onPresentationAdded)

  /**
   *  ___ _ __   ___  _ __  ___  ___  _ __
   * / __| '_ \ / _ \| '_ \/ __|/ _ \| '__|
   * \__ \ |_) | (_) | | | \__ \ (_) | |
   * |___/ .__/ \___/|_| |_|___/\___/|_|
   *     |_|
   */
  control.sponsor.input.onchange = () => {
    const [file] = control.sponsor.input.files ?? []
    dispatch(selectSponsor(file))
    // handler.emit('sponsor.selected', file)
  }

  // handler.on('sponsor.selected', onSponsorSelected)
  // handler.on('sponsor.created', onSponsorCreated)
  // handler.on('sponsor.added', onSponsorAdded)

  control.sponsor.button.onclick = () => {
    control.sponsor.input.click()
  }

  control.logo.onchange = (ev) => {
    console.log(ev.target);
    
  }

  const form = new Form<Schema>(() => {
    dispatch(updateForm(form.value))
    // handler.emit('form.updated', form.value)
  })

  // handler.on('form.updated', onFormChange)

  layer.background.setDraggable(false).setSrc(form.value.logo).render()

  layer.logo.setOrder(4).setSrc('logos/dev-parana.svg').render()

  layer.devParana.setSrc('dev-parana.svg').setOrder(19).render()

  layer.title
    .setText(control.title.value)
    .setSize(78)
    .setColor('white')
    .render()

  sidenav.onOpen = () => {
    queueMicrotask(() => {
      // control.title.element.focus()
    })
  }

  canvas.add(
    layer.grid,
    layer.logo,
    layer.background,
    layer.title,
    layer.details,
    layer.devParana
  )

  const dateTime = h(
    'div',
    {className: 'form-group'},
    control.date,
    control.time
  )

  form.append(
    control.logo,
    control.title,
    dateTime,
    control.location,
    control.background,
    control.presentation.add,
    accordion,
    control.sponsor.button,
    control.grid
  )

  sidenav.add(form)

  const main = h('main')

  main.append(sidenav.button)

  main.append(canvas)

  container.append(sidenav, main)
  document.body.append(titleBar, theme, download)
}
