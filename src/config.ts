import {DetailsLayer, GridLayer, ImageLayer, TextLayer} from '@core'
import type {Config, FormControl, LayerSchema} from '@interfaces'
import {getPositions} from './app/config'
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

const logos = [
  ['Nenhuma', ''],
  ['Agile', 'logos/agile.svg'],
  ['Curitiba', 'logos/curitiba.svg'],
  ['DevParaná', 'logos/dev-parana.svg'],
  ['Delphi', 'logos/delphi.svg'],
  ['Front In', 'logos/front-in-maringa.svg'],
  ['NodeJS', 'logos/nodejs.svg'],
  ['PHP', 'logos/php.svg'],
  ['Rust', 'logos/rust.svg'],
  ['TypeScript', 'logos/typescript.svg'],
]

const backgrounds = [
  ['Nenhuma', ''],
  ['Circulos', 'images/bermuda-circle.svg'],
  ['Colmeia', 'images/hive.svg'],
  ['Delphi 3D', 'images/delphi-3d.png'],
  ['Front In 3D', 'images/front-in-maringa-3d.png'],
  ['Github', 'images/github-wall.svg'],
  ['TypeScript 3D', 'images/typescript-3d.png'],
  ['NodeJS 3D', 'images/nodejs-3d.png'],
  ['PHP 3D', 'images/php-3d.png'],
  ['Papel gráfico', 'images/graph-paper.svg'],
  ['Rust 3D', 'images/rust-3d.png'],
  ['Placa', 'images/silicio.svg'],
]

const positions = getPositions(1080, 6)

export const config: Config = {
  ...positions,
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
    config.devParana.x,
    config.devParana.y,
    config.devParana.w,
    config.devParana.h
  ),
}

export const formControl: FormControl = {
  grid: new FieldSet('Grade'),
  title: new InputLabel('Título', 'text', 'title'),
  date: new InputLabel('Dia', 'date', 'date'),
  time: new InputLabel('Horário', 'time', 'time'),
  location: new InputLabel('Local', 'text', 'location'),
  background: new FieldSet('Imagem de fundo'),
  logo: new FieldSet('Grupo'),
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
  new CheckboxLabel('Mostrar grade', 'gridActive', 'true', config.grid.active),
  new SliderLabel(`Quantidade de quadros`, 'grid', config.grid.tiles)
)

formControl.logo.add(
  ...config.logos.map(([text, value]) => {
    const checked = text === 'DevParaná'
    return new RadioLabel(text, 'logo', value, checked)
  })
)

formControl.background.add(
  ...config.backgrounds.map(([text, value]) => {
    return new RadioLabel(text, 'background', value)
  })
)
