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
