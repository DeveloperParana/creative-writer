import {Vector2} from '../../math'

export abstract class Layer extends OffscreenCanvas {
  draggable = true
  protected dragging = false

  protected offset = new Vector2()

  protected context: OffscreenCanvasRenderingContext2D

  position: Vector2

  #active = true

  get active() {
    return this.#active
  }

  #order = 1

  get order() {
    return this.#order
  }

  constructor(x: number, y: number, width: number, height: number) {
    super(width, height)
    this.position = new Vector2(x, y)
    this.context = this.getContext('2d')!
  }

  abstract render(): Promise<void>

  setOrder(order: number) {
    this.#order = order
    return this
  }

  setActive(active: boolean) {
    this.#active = active
    return this
  }

  setDraggable(draggable: boolean) {
    this.draggable = draggable
    return this
  }

  setPosition(x: number, y: number) {
    this.position.set(x, y)
    return this
  }

  detectCollision(v2: Vector2) {
    const topLeft = this.position
    const clone = topLeft.clone()
    const vector = new Vector2(this.width, this.height)
    const bottomRight = clone.add(vector)

    return (
      v2.x >= topLeft.x &&
      v2.y >= topLeft.y &&
      v2.x <= bottomRight.x &&
      v2.y <= bottomRight.y
    )
  }

  dragStart(start: Vector2) {
    this.dragging = true
    this.offset.copy(start).sub(this.position)
  }

  drag(mousePos: Vector2, gridSize: number) {
    if (this.dragging) {
      this.position.copy(mousePos).sub(this.offset)

      // Snap ao grid mais próximo
      this.position.x = Math.round(this.position.x / gridSize) * gridSize
      this.position.y = Math.round(this.position.y / gridSize) * gridSize
    }
  }

  dragTo(point: Vector2) {
    if (this.dragging) {
      console.log(point)

      this.position.copy(point).sub(this.offset)
    }
  }

  dragStop() {
    this.dragging = false
  }
}
