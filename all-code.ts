export * from './layer'
import {Vector2} from '../../math'

export abstract class Layer extends OffscreenCanvas {
  draggable = true
  protected dragging = false

  protected offset = new Vector2()

  protected context: OffscreenCanvasRenderingContext2D

  position: Vector2

  #active = true

  get active() {
    return this.#active
  }

  #order = 1

  get order() {
    return this.#order
  }

  constructor(x: number, y: number, width: number, height: number) {
    super(width, height)
    this.position = new Vector2(x, y)
    this.context = this.getContext('2d')!
  }

  abstract render(): Promise<void>

  setOrder(order: number) {
    this.#order = order
    return this
  }

  setActive(active: boolean) {
    this.#active = active
    return this
  }

  setDraggable(draggable: boolean) {
    this.draggable = draggable
    return this
  }

  setPosition(x: number, y: number) {
    this.position.set(x, y)
    return this
  }

  detectCollision(v2: Vector2) {
    const topLeft = this.position
    const clone = topLeft.clone()
    const vector = new Vector2(this.width, this.height)
    const bottomRight = clone.add(vector)

    return (
      v2.x >= topLeft.x &&
      v2.y >= topLeft.y &&
      v2.x <= bottomRight.x &&
      v2.y <= bottomRight.y
    )
  }

  dragStart(start: Vector2) {
    this.dragging = true
    this.offset.copy(start).sub(this.position)
  }

  drag(mousePos: Vector2, gridSize: number) {
    if (this.dragging) {
      this.position.copy(mousePos).sub(this.offset)

      // Snap ao grid mais próximo
      this.position.x = Math.round(this.position.x / gridSize) * gridSize
      this.position.y = Math.round(this.position.y / gridSize) * gridSize
    }
  }

  dragTo(point: Vector2) {
    if (this.dragging) {
      console.log(point)

      this.position.copy(point).sub(this.offset)
    }
  }

  dragStop() {
    this.dragging = false
  }
}
import {DetailsSchema} from '@interfaces/layer-schema'
import {ImageLayer} from './image-layer'
import {WordLayer} from './word-layer'
import {Layer} from './base'
import {dateTime} from '@utils/date-time'

export class DetailsLayer extends Layer implements DetailsSchema {
  calendar = new ImageLayer(this.position.x, 0, 180, 180)
    .setSize(48, 48)
    .setSrc('icons/calendar.svg')

  clock = new ImageLayer(this.position.x, 0, 180, 180)
    .setSize(48, 48)
    .setSrc('icons/clock.svg')

  pin = new ImageLayer(this.position.x, 0, 1080, 180)
    .setSize(48, 48)
    .setSrc('icons/pin.svg')

  date = new WordLayer(0, 0, this.width - this.calendar.width, 180)
    .setSize(48)
    .setWeight('normal')
    .setColor('#D9D9D9')

  time = new WordLayer(0, 0, this.width - this.clock.width, 180)
    .setSize(48)
    .setWeight('normal')
    .setColor('#D9D9D9')

  location = new WordLayer(0, 0, this.width - this.pin.width, 180)
    .setSize(48)
    .setWeight('normal')
    .setColor('#D9D9D9')

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)

    let y = this.height / 4 - 12

    let x = 20

    await this.renderDate(x, y)

    x += 320

    await this.renderTime(x, y)

    y += 66
    x = 20

    await this.renderLocation(x, y)
  }

  async renderDate(x: number, y: number) {
    if (!this.date.isEmpty) {
      await this.calendar.render()
      this.context.drawImage(this.calendar, x, y)
    }

    await this.date.render()
    this.context.drawImage(this.date, x + 64, y - 8)
  }

  async renderTime(x: number, y: number) {
    if (!this.time.isEmpty) {
      await this.clock.render()
      this.context.drawImage(this.clock, x, y)
    }

    await this.time.render()
    this.context.drawImage(this.time, x + 64, y - 8)
  }

  async renderLocation(x: number, y: number) {
    if (!this.location.isEmpty) {
      await this.pin.render()
      this.context.drawImage(this.pin, x, y)
    }

    await this.location.render()
    this.context.drawImage(this.location, x + 64, y - 8)
  }

  setDate(value: string) {
    this.date.setWord(dateTime.format(new Date(value))).render()
    return this
  }

  setTime(time: string) {
    this.time.setWord(time).render()
    return this
  }

  setLocation(location: string) {
    this.location.setWord(location).render()
    return this
  }
}
import {Layer} from './base'

export class GridLayer extends Layer {
  draggable = false

  #color = '#2bf84620'
  get color() {
    return this.#color
  }

  #line = 2
  get line() {
    return this.#line
  }

  #size = 6
  get size() {
    return this.#size
  }

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
  }

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)
    const col = this.width / this.size
    const row = this.height / this.size

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const path = new Path2D()

        this.context.lineWidth = this.line
        this.context.strokeStyle = this.color

        path.rect(x * col, y * row, col, row)

        this.context.stroke(path)
      }
    }
  }

  setColor(color: string) {
    this.#color = color
    return this
  }

  setLine(line: number) {
    this.#line = line
    return this
  }

  setSize(size: number) {
    this.#size = size
    return this
  }
}
import {Layer} from './base'

export class ImageLayer extends Layer {
  #image

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
    this.#image = new Image(width, height)
  }

  setSize(width: number, height: number) {
    this.width = width
    this.height = height
    return this
  }

  setSrc(src: string) {
    this.#image.src = src
    return this
  }

  async render() {
    this.context.canvas.width = this.context.canvas.width
    if (!this.#hasNoImage(this.#image.src)) {
      return this.#image.decode().then(() => {
        this.context.drawImage(this.#image, 0, 0, this.width, this.height)
      })
    }
  }

  #hasNoImage(src?: string) {
    return src === location.origin + '/undefined'
  }
}
export * from './base'
export * from './details-layer'
export * from './grid-layer'
export * from './image-layer'
export * from './photo-frame'
export * from './photo-layer'
export * from './presentation-layer'
export * from './text-layer'
export * from './word-layer'
import {Layer} from './base'

export class PhotoFrameLayer extends Layer {
  #image

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
    this.#image = new Image(width, height)
    this.#image.src = 'details/avatar-border.svg'
  }

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)

    return this.#image.decode().then(() => {
      this.context.drawImage(this.#image, 0, 0)
    })
  }
}
import {Layer} from './base'

export class Figure extends Image {
  constructor(src: string, width = 180, height = 180) {
    super(width, height)
    this.src = src
  }

  setSize(w: number, h: number) {
    this.width = w
    this.height = h
    return this
  }

  async load() {
    return this.decode().then(() => this)
  }
}

export class PhotoLayer extends Layer {
  #image

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
    this.#image = new Image(width - 16, height - 16)
  }

  setSize(width: number, height: number) {
    this.width = width
    this.height = height
    return this
  }

  setSrc(src: string) {
    this.#image.src = src
    return this
  }

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)

    if (!this.#hasNoImage(this.#image.src)) {
      return this.#image.decode().then(() => {
        const {width, height} = this.#image
        this.context.drawImage(this.#image, 8, 8, width, height)
      })
    }
  }

  #hasNoImage(src?: string) {
    return src === location.origin + '/undefined'
  }
}
import {PresentationSchema} from '@interfaces/presentation'
import {PhotoFrameLayer} from './photo-frame'
import {PhotoLayer} from './photo-layer'
import {WordLayer} from './word-layer'
import {Layer} from './base'

export class PresentationLayer extends Layer implements PresentationSchema {
  photo = new PhotoLayer(this.position.x, 0, 180, 180)
  photoFrame = new PhotoFrameLayer(this.position.x, 0, 180, 180)

  title = new WordLayer(
    this.position.x + this.photo.position.x,
    0,
    this.width - this.photo.width,
    180
  )
    .setSize(48)
    .setWeight('bold')
    .setColor('#62F772')

  speaker = new WordLayer(
    this.position.x + this.photo.position.x,
    0,
    this.width - this.photo.width,
    180
  )
    .setSize(32)
    .setWeight('normal')
    .setColor('#D9D9D9')

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)

    let y = this.height / 4

    let x = 0

    await this.renderPhoto(x, y)

    x += 320

    await this.renderTitle(x, y)

    y += 66
    x = 20

    await this.renderSpeaker(x, y)

    // await this.photo
    //   .render()
    //   .then(() => this.photo.render())
    //   .then(() => this.context.drawImage(this.photo, x, y))
    //   .then(() => this.photoFrame.render())
    //   .then(() => this.context.drawImage(this.photoFrame, x, y))
    //   .then(() => this.title.render())
    //   .then(() => {
    //     y += 40
    //     x += this.photo.width + x
    //     this.context.drawImage(this.title, x, y)
    //   })
    //   .then(() => this.speaker.render())
    //   .then(() => this.context.drawImage(this.speaker, x, y))
  }

  async renderPhoto(x: number, y: number) {
    await this.photo.render()
    this.context.drawImage(this.photo, x, y)

    await this.photoFrame.render()
    this.context.drawImage(this.photoFrame, x, y)
  }

  async renderTitle(x: number, y: number) {
    await this.title.render()
    this.context.drawImage(this.title, x, y)
  }

  async renderSpeaker(x: number, y: number) {
    await this.speaker.render()
    this.context.drawImage(this.speaker, x, y)
  }

  setPhoto(photo: string) {
    this.photo.setSrc(photo)
  }

  setTitle(title: string) {
    this.title.setWord(title)
  }

  setSpeaker(speaker: string, role: string) {
    this.speaker.setWord(`${speaker} - ${role}`)
  }
}
import {writeText} from '@utils/writes'
import {Layer} from './base/layer'

type FontWeight = 'normal' | 'bold'

export class TextLayer extends Layer {
  #color = 'black'

  #weight: FontWeight = 'bold'
  #family = 'Mukta'
  #size = 24
  #text = ''

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
  }

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.font = this.#getFont()
    this.context.fillStyle = this.#color

    const lines = writeText(this.context, this.#text, this.width)

    const lineHeight = this.#size * 1.2

    if (lines.length === 1) {
      const y = this.height / 2 + lineHeight / 4
      this.context.fillText(lines[0], 0, y, this.width)
    } else if (lines.length === 2) {
      const y1 = this.height / 2 - lineHeight / 4.4
      const y2 = this.height / 2 + lineHeight / 1.4
      this.context.fillText(lines[0], 0, y1, this.width)
      this.context.fillText(lines[1], 0, y2, this.width)
    }
  }

  #getFont() {
    return `${this.#weight} ${this.#size}px ${this.#family}`
  }

  setSize(size: number) {
    this.#size = size
    return this
  }

  setWeight(weight: FontWeight) {
    this.#weight = weight
    return this
  }

  setColor(color: string) {
    this.#color = color
    return this
  }

  setText(text: string) {
    this.#text = text
    return this
  }
}
import {Layer} from './base/layer'

type FontWeight = 'normal' | 'bold'

export class WordLayer extends Layer {
  #color = 'black'

  #weight: FontWeight = 'bold'
  #family = 'Mukta'
  #size = 24
  #word = ''

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
  }

  async render() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.font = this.#getFont()
    this.context.fillStyle = this.#color

    this.context.fillText(this.#word, 0, this.#size)
  }

  #getFont() {
    return `${this.#weight} ${this.#size}px ${this.#family}`
  }

  setSize(size: number) {
    this.#size = size
    return this
  }

  setWeight(weight: FontWeight) {
    this.#weight = weight
    return this
  }

  setColor(color: string) {
    this.#color = color
    return this
  }

  get isEmpty() {
    return this.#word === ''
  }

  setWord(text: string) {
    this.#word = text
    return this
  }
}
