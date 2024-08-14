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
