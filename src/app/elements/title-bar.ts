import { debounce } from '@utils/debounce'
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
    if ('windowControlsOverlay' in navigator) {
      navigator.windowControlsOverlay.addEventListener(
        "geometrychange",
        debounce((event) => {
          const { visible } = navigator.windowControlsOverlay;
          const { width } = event.titlebarAreaRect;
          const is = visible ? "visible" : "hidden";
          console.log(`Overlay is ${is} with ${width}px`);
        })
      );
    }
  }
}
