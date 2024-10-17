import {LitElement, html} from 'lit';
import onDocumentScroll from '../utils/on-document-scroll.js'

const CLASS_NAME_SHOW = 'back-to-top-show'
const CLASS_NAME = 'back-to-top'

export class Icon extends LitElement {

  // Declare reactive properties
  static properties = {
    name: '',
    type: 'primary',
    background: ''
  };

  render() {
    return html`
      <svg class="icon icon-${this.type} ${this.background ? 'bg-' + this.background : ''}"><use href="/bootstrap-italia/svg/sprites.svg#${this.name}"></use></svg>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('bsi-icon', Icon);
