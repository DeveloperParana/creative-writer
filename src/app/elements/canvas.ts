import {builtIn} from '@utils/decorators'
import {Vector2} from '@math/vector2'
import {Layer} from 'src/app/core/base'

@builtIn('canvas', 'cw-canvas')
export class Canvas extends HTMLCanvasElement {
  context

  #layers: Layer[] = []
  #dragging: Layer | null = null

  constructor(
    public width: number,
    public height: number,
  ) {
    super()
    this.context = this.getContext('2d')!
    this.onmousedown = this.#onMouseDown
    this.onmousemove = this.#onMouseMove
    this.onmouseup = this.#onMouseUp

    this.classList.add('transparent')

    this.oncontextmenu = (event) => {
      event.preventDefault()

      const {offsetX, offsetY} = event

      const position = new Vector2(offsetX, offsetY)

      const layer = this.#layers
        .filter((layer) => layer.draggable)
        .find((layer) => {
          return layer.detectCollision(position)
        })

      if (layer) {
        for (const fn of this.#onContextMenu) {
          fn(layer)
        }
      }
    }
  }

  render = () => {
    const {width, height} = this.context.canvas
    this.context.clearRect(0, 0, width, height)

    this.#layers
      .filter((layer) => layer.active)
      .sort((a, b) => a.order - b.order)
      .map((layer) => {
        this.context.drawImage(layer, layer.position.x, layer.position.y)
      })
  }

  #onContextMenu = new Set<(value: Layer) => void>()
  onContextMenu(fn: (value: Layer) => void) {
    this.#onContextMenu.add(fn)

    return () => this.#onContextMenu.delete(fn)
  }

  onMouseDown = ({offsetX, offsetY}: MouseEvent) => {
    const position = new Vector2(offsetX, offsetY)

    const layer = this.#layers
      .filter((layer) => layer.draggable)
      .find((layer) => {
        return layer.detectCollision(position)
      })

    if (layer) {
      // this.#dragLayer(layer, position)
      this.#dragging = layer
      layer.dragStart(position)
    }
  }

  #onMouseDown = ({offsetX, offsetY}: MouseEvent) => {
    const position = new Vector2(offsetX, offsetY)

    const layer = this.#layers
      .filter((layer) => layer.draggable)
      .find((layer) => {
        return layer.detectCollision(position)
      })

    if (layer) this.#dragLayer(layer, position)
  }

  #onMouseMove = (event: MouseEvent) => {
    if (this.#dragging) {
      const {offsetX, offsetY} = event
      const newPosition = new Vector2(offsetX, offsetY)
      this.#dragging.dragTo(newPosition)
      this.render()
    }
  }

  #onMouseUp = () => {
    if (this.#dragging) {
      this.#dragging.dragStop()
      this.#dragging = null
      this.render()
    }
  }

  #dragLayer(layer: Layer, position: Vector2) {
    this.#dragging = layer
    layer.dragStart(position)
  }

  add(...layers: Layer[]) {
    this.#layers.push(...layers)
    this.order()
    setTimeout(this.render, 50)
  }

  order() {
    this.#layers.sort((a, b) => a.order - b.order)
  }

  reorder(layer: Layer, newOrder: number) {
    layer.setOrder(newOrder)
    this.order()
    this.render()
  }
}
