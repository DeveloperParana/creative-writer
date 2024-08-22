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
    if (!this.#hasNoImage(this.#image.src)) {
      if (this.#normalizeSrc(this.#image.src)) {
        return this.#image.decode().then(() => {
          this.context.clearRect(0, 0, this.width, this.height)
          this.context.drawImage(this.#image, 0, 0, this.width, this.height)
        })
      } else {
        this.context.clearRect(0, 0, this.width, this.height)
      }
    }
  }

  #normalizeSrc(src = '') {

    return src.replace(`${this.host}`, '')
  }

  #hasNoImage(src?: string) {
    return src === this.host + 'undefined'
  }

  get host() {
    return [location.origin, location.pathname].join('')
  }
}
