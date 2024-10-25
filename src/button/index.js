import {BaseComponent} from '../base-component';
import {html} from 'lit';

import styles from './main.scss'


export class Button extends BaseComponent {

  static styles = styles

  // Declare reactive properties
  static properties = {
    type: 'button',
    variant: '',
    outline: false,
    disabled: false
  };

  constructor() {
    super();
    this._variant = this.variant !== '' ? `btn-${this.variant}` : ''
    this._outline = this.outline ? `${this.outline ? 'outline-' : ''}${this.variant}` : ''
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <button type="${this.type}" class="btn ${this._variant} ${this._outline}">
        <slot></slot>
      </button>
    `;
  }

}

customElements.define('bsi-button', Button);
