import {PresentationLayer} from 'src/app/core/presentation-layer'
import {EventHandler} from '@interfaces/event-handler'
import {Presentation} from '@interfaces/presentation'
import {LayerSchema} from '@interfaces/layer-schema'
import {Config} from '@interfaces/config'
import {use} from '@websqnl/di'

export const onPresentationHandled = (value: Presentation) => {
  console.log(value)

  const config = use(Config)
  const handler = use(EventHandler)
  const layer = use(LayerSchema)

  // debugger

  const width = config.width
  const height = config.height / config.grid.tile

  const y = height * (layer.presentations.length + 1) + 90

  const presentation = new PresentationLayer(0, y, width, height)

  presentation.setPhoto(value.photo)
  presentation.setTitle(value.title)
  presentation.setSpeaker(value.name, value.role)

  handler.emit('presentation.created', presentation)

  // const offset = 180
  // const padding = {x: 40, y: 50}

  // let x = padding.x
  // let y = offset + padding.y

  // const photo = new PhotoLayer(x, y, offset, offset).setSrc(presentation.photo)

  // const title = new TextLayer(
  //   offset * 2,
  //   offset + offset,
  //   config.width - (offset + offset / 2),
  //   50
  // )
  //   .setColor('#62F772')
  //   .setWeight('bold')
  //   .setSize(48)
  //   .setText(presentation.title)

  // const speaker = new WordLayer(
  //   offset * 2,
  //   offset + offset / 3 + 50,
  //   config.width - (offset + offset / 3),
  //   50
  // )
  //   .setColor('#D9D9D9')
  //   .setWeight('normal')
  //   .setSize(36)
  //   .setWord(presentation.name)

  // const role = new WordLayer(x, y, config.width - 360, 270).setWord(
  //   presentation.role
  // )

  // handler.emit('presentation.created', {title, speaker, photo, role})
}
