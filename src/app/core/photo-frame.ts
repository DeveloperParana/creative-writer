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
