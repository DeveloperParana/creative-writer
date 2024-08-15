import {DetailsLayer, GridLayer, ImageLayer, TextLayer} from 'src/app/core'
import type {Config, FormControl, LayerSchema} from '@interfaces'
import {
  Input,
  Button,
  FieldSet,
  InputLabel,
  RadioLabel,
  SliderLabel,
  CheckboxLabel,
} from '@elements'

export const themes = {
  light: {
    primary: [19, 181, 43],
    onPrimary: [255, 255, 255],
    surface: [250, 250, 250],
    onSurface: [16, 16, 16],
  },
  dark: {
    primary: [68, 248, 94],
    onPrimary: [0, 0, 0],
    surface: [16, 16, 16],
    onSurface: [255, 255, 255],
  },
}

const width = 1080
const height = 1080
const tile = 6

const grid = {
  x: 0,
  y: 0,
  w: width,
  h: height,
  tile,
  active: false,
}

const background = {
  x: 0,
  y: 0,
  w: width,
  h: height,
}

const logo = {
  x: 0,
  y: 0,
  w: 220,
  h: 220,
}

const title = {
  x: 220,
  y: 20,
  w: width - 180,
  h: 180,
}

const presentation = {
  x: 0,
  y: 180,
  w: width,
  h: 180 * 3,
}

const date = {
  x: 0,
  y: height - 360,
  w: 270,
  h: 180,
}

const time = {
  x: date.x + date.w,
  y: date.y,
  w: 180,
  h: date.h,
}

const location = {
  x: time.x + time.w,
  y: time.y,
  w: width - time.x - time.w,
  h: time.h,
}

const details = {
  x: 0,
  y: height - 360,
  w: width,
  h: 180,
}

const sponsor = {
  x: 0,
  y: height - 180,
  w: 360,
  h: 180,
}

const devParana = {
  x: width - 360,
  y: height - 180,
  w: 360,
  h: 180,
}

const logos = [
  ['Agile', 'logos/agile.svg'],
  ['Curitiba', 'logos/curitiba.svg'],
  ['Delphi', 'logos/delphi.svg'],
  ['Geral', 'logos/geral.svg'],
  ['NodeJS', 'logos/nodejs.svg'],
  ['PHP', 'logos/php.svg'],
  ['Rust', 'logos/rust.svg'],
  ['TypeScript', 'logos/typescript.svg'],
]

const backgrounds = [
  ['Github', 'images/github-wall.svg'],
  ['Aspiral', 'images/bermuda-circle.svg'],
  ['Colmeia', 'images/hive.svg'],
  ['NodeJS 3D', 'images/nodejs-3d.png'],
  ['PHP 3D', 'images/php-3d.png'],
  ['Rust 3D', 'images/rust-3d.png'],
  ['Front In', 'images/front-in-maringa-3d.png'],
]

export const config: Config = {
  width,
  height,
  grid,
  logo,
  background,
  title,
  details,
  date,
  time,
  location,
  presentation,
  sponsor,
  devParana,
  backgrounds,
  logos,
}

export const layerSchema: LayerSchema = {
  grid: new GridLayer(
    config.grid.x,
    config.grid.y,
    config.grid.w,
    config.grid.h
  ),
  background: new ImageLayer(
    config.background.x,
    config.background.y,
    config.background.w,
    config.background.h
  ),
  logo: new ImageLayer(
    config.logo.x,
    config.logo.y,
    config.logo.w,
    config.logo.h
  ),
  title: new TextLayer(
    config.title.x,
    config.title.y,
    config.title.w,
    config.title.h
  ),
  details: new DetailsLayer(
    config.details.x,
    config.details.y,
    config.details.w,
    config.details.h
  ),
  presentations: [],
  sponsors: [],
  devParana: new ImageLayer(
    config.logo.x,
    config.logo.y,
    config.logo.w,
    config.logo.h
  ),
}

export const formControl: FormControl = {
  grid: new FieldSet('Grade'),
  title: new InputLabel('Título', 'text', 'title'),
  date: new InputLabel('Dia', 'date', 'date'),
  time: new InputLabel('Horário', 'time', 'time'),
  location: new InputLabel('Local', 'text', 'location'),
  background: new FieldSet('Imagem de fundo'),
  logo: new FieldSet('Logo'),
  sponsor: {
    input: new Input('file', 'file', false),
    button: new Button('Adicionar patrocinador'),
  },
  presentation: {
    add: new Button('Adicionar apresentação', 'button'),
  },
  reset: new Button('Reset', 'reset'),
}

formControl.grid.add(
  new CheckboxLabel('Mostrar', 'gridActive', 'true', config.grid.active),
  new SliderLabel('Quantidade', 'grid', config.grid.tile)
)

formControl.logo.add(
  ...config.logos.map(([text, value]) => {
    return new RadioLabel(text, 'logo', value)
  })
)

formControl.background.add(
  ...config.backgrounds.map(([text, value]) => {
    return new RadioLabel(text, 'background', value)
  })
)
