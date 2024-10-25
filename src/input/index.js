import {BaseComponent} from '../base-component';
import InputLabel from '../utils/input-label'
import {html} from 'lit';

import styles from './main.scss'


export class Input extends BaseComponent {

  static styles = styles

  // Declare reactive properties
  static properties = {
    id: '',
    label: '',
    type: 'text'
  };

  firstUpdated() {
    this._label = new InputLabel(this.renderRoot.querySelector(`input`), this.renderRoot);
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
  
}

customElements.define('bsi-input', Input);
