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
