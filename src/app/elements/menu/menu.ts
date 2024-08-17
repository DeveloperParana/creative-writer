import {MenuButton} from './menu-button'
import {builtIn} from '@utils/decorators'
import {h} from '@utils/h'

@builtIn('menu', 'cw-menu')
export class Menu extends HTMLMenuElement {
  constructor(
    public context: HTMLElement,
    ...buttons: MenuButton[]
  ) {
    super()
    this.add(...buttons)
  }

  add(...buttons: MenuButton[]) {
    for (const button of buttons) {
      this.append(h('li', {}, button))
    }
  }

  open({pageX, pageY}: MouseEvent) {
    this.context.style.left = pageX + 'px'
    this.context.style.top = pageY + 'px'

    if (this.context.style.display === 'none') {
      this.context.style.display = 'block'
    }
  }

  close() {
    this.context.style.display = 'none'
  }

  static create(context: HTMLElement, ...buttons: MenuButton[]) {
    context.style.display = 'none'
    const menu = new Menu(context, ...buttons)
    context.append(menu)
    return menu
  }
}
