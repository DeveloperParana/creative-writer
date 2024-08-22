import {SidenavButton} from './sidenav-button'
import {builtIn} from '@utils/decorators'

@builtIn('aside', 'cw-sidenav')
export class Sidenav extends HTMLElement {
  #onOpen = new Set<VoidFunction>()
  set onOpen(fn: VoidFunction) {
    this.#onOpen.add(fn)
  }

  #onClose = new Set<VoidFunction>()
  set onClose(fn: VoidFunction) {
    this.#onClose.add(fn)
  }

  onClickInsideButton = () => {
    this.classList.toggle('is-open')
    this.button.classList.toggle('is-open')
    document.body.classList.toggle('cw-sidenav-is-open')
    
    this.#isOpened = !this.#isOpened
    
    if (this.#isOpened) {
      for (const fn of this.#onOpen) fn()
    } else {
      for (const fn of this.#onClose) fn()
    }

  }

  button = new SidenavButton(this.onClickInsideButton)

  #isOpened = false

  connectedCallback() {
    this.classList.add('cw-sidenav')
  }

  add(...children: Node[]) {
    this.append(...children)
  }
}
