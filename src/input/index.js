import {LitElement, html} from 'lit';
import InputLabel from '../utils/input-label'


export class Input extends LitElement {

  // Declare reactive properties
  static properties = {
    id: '',
    label: '',
    type: 'text'
  };

  firstUpdated() {
    this._label = new InputLabel(this.renderRoot.querySelector(`input`));
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="form-group">
        <label for="${this.id}">${this.label}</label>
        <input type="${this.type}" class="form-control" id="${this.id}">
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('bsi-input', Input);
