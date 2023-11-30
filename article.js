import { html, css, LitElement } from './vendor/lit-core.min.js'
import snarkdown from './vendor/snarkdown.es.js'

export class Article extends LitElement {
  static styles = css`
    a {
      color: var(--sl-color-primary-700);
    }

    a:hover {
      color: var(--sl-color-primary-500);
    }
    img {
      width: 100%;
    }
  `

  static properties = {
    _markup: { type: Object }
  }

  constructor () {
    super()
    this._markup = this.htmlToElement(snarkdown(this.innerText))
  }

  render () {
    return html`${this._markup}`
  }

  htmlToElement (html) {
    const template = document.createElement('template')
    template.innerHTML = `<article>${html}</article>`
    return template.content.firstChild
  }
}

window.customElements.define('jr-article', Article)
