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

  #border = new Figure('details/avatar-border.svg')

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
      const radius = 128

      const center = {
        x: this.width / 2,
        y: this.height / 2,
      }

      this.context.beginPath()
      this.context.arc(center.x, center.y, radius, 0, Math.PI * 2, false)
      this.context.clip()

      return this.#image.decode().then(() => {
        const {width, height} = this.#image
        this.context.drawImage(this.#image, 8, 8, width, height)
        this.#border.load().then((border) => {
          this.context.drawImage(border, 0, 0, this.width, this.height)
        })
      })
    }
  }

  #hasNoImage(src?: string) {
    return src === location.origin + '/undefined'
  }
}
