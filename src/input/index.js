import { BaseComponent } from "../base-component";
import InputLabel from "../utils/input-label";
import { html } from "lit";

import styles from "./main.scss";

export class Input extends BaseComponent {
  static styles = styles;

  static get formAssociated() {
    return true;
  }

  // Declare reactive properties
  static properties = {
    id: "",
    label: "",
    type: { type: String },
    value: { type: String },
    name: { type: String },
  };

  constructor() {
    super();
    this.type = "text";
    this.internals = this.attachInternals();
    this.value = ''
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.internals.setFormValue(this._inputElement.value);
      if (this.value !== this._inputElement.value) {
        if (this.value) {
          this._inputElement.value = this.value;
        } else {
          this._inputElement.value = "";
        }
        this.notifyValueChanged();
      }
    }
  }

  notifyValueChanged() {
    let inputEvent = null;
    inputEvent = new Event("input", {
      bubbles: true,
      composed: true,
    });


    // Dispatched event to alert outside shadow DOM context of event firing.
    this.dispatchEvent(inputEvent);
  }

  firstUpdated() {
    this._label = new InputLabel(
      this.renderRoot.querySelector(`input`),
      this.renderRoot
    );
    this._inputElement = this.renderRoot.querySelector("input");
  }

  handleInput() {
    this.value = this._inputElement.value;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="form-group">
        <label for="${this.id}">${this.label}</label>
        <input
          @input="${this.handleInput}"
          type="${this.type}"
          class="form-control"
          id="${this.id}"
          name="${this.name}"
        />
      </div>
    `;
  }
}

customElements.define("bsi-input", Input);
