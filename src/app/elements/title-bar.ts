import {debounce} from '@utils/debounce'
import {builtIn} from '@utils/decorators'

@builtIn('div', 'cw-title-bar')
export class TitleBar extends HTMLDivElement {
  text: Text

  constructor(text: string, public id = 'title-bar') {
    super()
    this.text = new Text(text)
    this.append(this.text)
  }

  connectedCallback() {
    this.style.display = 'none'

    if ('windowControlsOverlay' in navigator) {
      navigator.windowControlsOverlay.addEventListener(
        'geometrychange',
        debounce((event) => {
          if (this.style.display === 'none') this.#setstyles()

          const {visible} = navigator.windowControlsOverlay
          const {width} = event.titlebarAreaRect
          const is = visible ? 'visible' : 'hidden'
          console.log(`Overlay is ${is} with ${width}px`)
        })
      )
    }
  }

  #setstyles() {
    this.style.position = 'fixed'
    this.style.left = `env(titlebar-area-x, 0)`
    this.style.top = `env(titlebar-area-y, 0)`
    this.style.height = `env(titlebar-area-height, 50px)`
    this.style.width = `env(titlebar-area-width, 100%)`
    this.style.color = `rgb(var(--cw-surface-rgb))`
    this.style.display = `flex`
    this.style.alignContent = `center`
    this.style.justifyContent = `center`
    this.style.fontWeight = `bold`
    this.style.fontSize = `1.2em`
    this.style.margin = `0`
  }
}
