import {PresentationSchema} from '@interfaces/presentation'
import {PhotoFrameLayer} from './photo-frame'
import {PhotoLayer} from './photo-layer'
import {WordLayer} from './word-layer'
import {Layer} from './base'

export class PresentationLayer extends Layer implements PresentationSchema {
  photo = new PhotoLayer(60, 0, 180, 180)
  photoFrame = new PhotoFrameLayer(60, 0, 180, 180)

  title = new WordLayer(
    this.photo.width + 90,
    20,
    this.width + 40 - this.photo.width,
    90
  )
    .setSize(48)
    .setWeight('bold')
    .setColor('#62F772')

  speaker = new WordLayer(
    this.photo.width + 90,
    90,
    this.width + 40 - this.photo.width,
    90
  )
    .setSize(32)
    .setWeight('normal')
    .setColor('#D9D9D9')

  async render() {
    await this.photo.render().then(() => {
      this.context.clearRect(0, 0, this.width, this.height)

      this.context.drawImage(
        this.photo,
        this.photo.position.x,
        this.photo.position.y
      )
    })

    await this.photoFrame.render().then(() => {
      this.context.drawImage(
        this.photoFrame,
        this.photoFrame.position.x,
        this.photoFrame.position.y
      )
    })

    await this.title.render().then(() => {
      this.context.drawImage(
        this.title,
        this.title.position.x,
        this.title.position.y
      )
    })

    await this.speaker.render().then(() => {
      this.context.drawImage(
        this.speaker,
        this.speaker.position.x,
        this.speaker.position.y
      )
    })
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
