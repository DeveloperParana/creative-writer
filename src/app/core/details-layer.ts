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
