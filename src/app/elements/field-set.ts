import {builtIn} from '@utils/decorators'
import {h} from '@utils/h'

@builtIn('fieldset', 'cw-fieldset')
export class FieldSet extends HTMLFieldSetElement {
  legend

  #controls = new Map()

  get controls() {
    return Object.fromEntries(this.#controls.entries())
  }

  constructor(text: string) {
    super()
    this.legend = this.#createLegend(text)
  }

  #createLegend(text: string) {
    return h('legend', {}, text)
  }

  connectedCallback() {
    this.append(this.legend)

    console.log(this.elements)
  }
  
  add(...children: Element[]) {
    this.append(...children)
    console.log(this.elements)
  }
}
