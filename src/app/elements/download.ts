import {builtIn, parseDOM, h, timeout} from '@utils'
import {Canvas} from './canvas'

@builtIn('button', 'cw-download-button')
export class DownloadButton extends HTMLButtonElement {
  svg = parseDOM<SVGElement>(
    `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.104 3H13.8954V15.4847L18.3191 11.0611L21 13.7421L13.3405 21.4016C12.6001 22.1419 11.3998 22.1419 10.6595 21.4016L3 13.7421L5.68095 11.0611L10.104 15.4842V3Z" fill="currentColor" />
      </svg>

    `,
    'image/svg+xml'
  )

  constructor(private canvas: Canvas) {
    super()
  }

  connectedCallback() {
    this.classList.add('cw-download-button')
    this.append(this.svg)

    this.onclick = () => {
      this.canvas.toBlob(
        (blob) => {
          if (blob) {
            const href = URL.createObjectURL(blob)
            const download = `meetup-poster-${new Date()}.png`
            const link = h('a', {href, download})
            link.onclick = () => {
              timeout(() => URL.revokeObjectURL(href), 100)
            }
            link.click()
          }
        },
        'image/png',
        1
      )
    }
  }
}
