import {BaseComponent} from '../base-component';
import {html} from 'lit';

const CLASS_NAME_SHOW = 'back-to-top-show'
const CLASS_NAME = 'back-to-top'

import styles from './main.scss'

export class Icon extends BaseComponent {

  static styles = styles

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

}

customElements.define('bsi-icon', Icon);
