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
