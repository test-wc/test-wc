import {LitElement, html} from 'lit';


export class Button extends LitElement {

  static shadowRootOptions = {...LitElement.shadowRootOptions, mode: "open"};

  // Declare reactive properties
  static properties = {
    type: 'button',
    variant: '',
    outline: false,
    disabled: false
  };

  firstUpdated() {
    this._variant = this.variant === '' ? '' : `btn-${this.outline ? 'outline-' : ''}${this.variant}`
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <button type="${this.type}" class="btn ${this._variant}">
        <slot></slot>
      </button>
    `;
  }

}

customElements.define('bsi-button', Button);
