import {PhotoLayer} from 'src/app/core/photo-layer'
import {WordLayer} from 'src/app/core/word-layer'
export interface SubmittedPresentation {
  name: string
  role: string
  company?: string
  title: string
  photo?: File
  photoUrl?: string
}

export interface Presentation {
  title: string
  name: string
  role: string
  company?: string
  photo: string
}

export interface PresentationSchema {
  title: WordLayer
  speaker: WordLayer
  // role: WordLayer
  photo: PhotoLayer
  company?: WordLayer
}
