import {SubmittedPresentation} from '@interfaces/presentation'
import {GithubUser} from '@interfaces/github-user'
import {InputLabel} from '@elements/input'
import {builtIn} from '@utils/decorators'
import {Button} from '@elements/button'
import {values} from '@utils/iterators'
import {Form} from '@elements/form'
import {h} from '@utils/h'

@builtIn('form', 'cw-presentation-form')
export class PresentationForm extends Form<SubmittedPresentation> {
  header = h('h2', {textContent: 'Apresentação'})

  controls = {
    title: new InputLabel(
      'Título da apresentação',
      'text',
      'title'
    ).setRequired(true),
    github: new InputLabel('Github', 'text', 'github'),
    speaker: new InputLabel('Nome do apresentador', 'text', 'name').setRequired(
      true
    ),
    role: new InputLabel('Papel de atuação', 'text', 'role').setRequired(true),
    photo: new InputLabel<File>('Foto', 'file', 'photo').setRequired(true),
    photoUrl: new InputLabel<string>('Foto URL', 'url', 'photoUrl'),
  }

  actions = {
    submit: new Button('Adicionar', 'submit'),
  }

  connectedCallback() {
    this.append(...values(this.controls), ...values(this.actions))
    this.controls.photoUrl.element.readOnly = true

    this.addEventListener('submit', () => {
      this.controls.title.element.readOnly = true
      this.controls.github.element.readOnly = true
      this.controls.speaker.element.readOnly = true
      this.controls.role.element.readOnly = true
      this.controls.photo.element.readOnly = true
    })

    this.controls.github.onchange = async () => {
      if (this.github.value) {
        const user = await this.getFromGithub(this.github.value)
        if (user) {
          this.controls.speaker.setValue(user.name)
          this.controls.photoUrl.setValue(user.avatar_url)
          this.controls.photo.setRequired(false)
          this.controls.photo.disable()
        }
      }
    }
  }

  async getFromGithub(user: string): Promise<GithubUser | void> {
    try {
      const api = `https://api.github.com/users`
      return await (await fetch(`${api}/${user}`)).json()
    } catch {
      // throw err
    }
  }
}
