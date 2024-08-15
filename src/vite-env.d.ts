/// <reference types="vite/client" />

declare const app: HTMLDivElement

interface Navigator {
  readonly windowControlsOverlay: WindowControlsOverlay
}

interface WindowControlsOverlay extends EventTarget {
  readonly visible: boolean
  getTitlebarAreaRect(): DOMRect
  ongeometrychange:
    | ((
        this: WindowControlsOverlay,
        event: WindowControlsOverlayGeometryChangeEvent
      ) => any)
    | null
  addEventListener(
    type: 'geometrychange',
    listener: (
      this: WindowControlsOverlay,
      event: WindowControlsOverlayGeometryChangeEvent
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: 'geometrychange',
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener(
    type: 'geometrychange',
    listener: (
      this: WindowControlsOverlay,
      event: WindowControlsOverlayGeometryChangeEvent
    ) => any,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: 'geometrychange',
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
}

declare var WindowControlsOverlay: {
  prototype: WindowControlsOverlay
  new (): WindowControlsOverlay
}

interface WindowControlsOverlayGeometryChangeEvent extends Event {
  new (
    type: string,
    eventInitDict?: WindowControlsOverlayGeometryChangeEventInit
  )
  readonly titlebarAreaRect: DOMRect
  readonly visible: boolean
}

interface WindowControlsOverlayGeometryChangeEventInit extends Event {
  titlebarAreaRect: DOMRect
  visible?: boolean
}
