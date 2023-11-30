import { html, css, LitElement } from './vendor/lit-core.min.js'

export class Prompt extends LitElement {
  static styles = css``

  static properties = {
    prompts: { type: Array },
    prompt: { type: String }
  }

  slotItems (e) {
    return Array.from(
      this.renderRoot
        .querySelector('slot[name=items]')
        .assignedElements({ flatten: true })[0]
        .children
    )
  }

  checkedItems (items) {
    return items.filter((item) => item.querySelector('input[type=checkbox]').checked).length
  }

  selectPrompt (e) {
    const items = this.slotItems(e)
    const checkedItems = this.checkedItems(items)
    const totalItems = items.length
    const promptIndex = Math.floor(
      (checkedItems / totalItems) * (this.prompts.length - 1)
    )
    this.prompt = this.prompts[promptIndex]
    return this.prompt
  }

  constructor () {
    super()
    this.addEventListener('click', this.selectPrompt)
    this.prompt = ''
  }

  attributeChangedCallback (name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal)
    if (name === 'prompts') this.prompt = JSON.parse(newVal)[0]
  }

  render () {
    return html`
      <slot name="instruction"></slot>
      <slot name="items"></slot>
      <h2 class="prompt" aria-live="polite">${this.prompt}</h2>
      <slot name="subprompt"></slot>
    `
  }
}
window.customElements.define('jr-prompt', Prompt)
