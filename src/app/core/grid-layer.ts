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
