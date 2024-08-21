interface RectConfig {
  x: number
  y: number
  w: number
  h: number
}

interface GridConfig extends RectConfig {
  tiles: number
  active: boolean
}

export abstract class Config {
  abstract width: number
  abstract height: number
  abstract grid: GridConfig
  abstract logo: RectConfig
  abstract background: RectConfig
  abstract title: RectConfig
  abstract presentation: RectConfig
  abstract details: RectConfig
  abstract date: RectConfig
  abstract time: RectConfig
  abstract location: RectConfig
  abstract sponsor: RectConfig
  abstract devParana: RectConfig
  abstract logos: string[][]
  abstract backgrounds: string[][]
}
