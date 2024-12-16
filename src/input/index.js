import { BaseComponent } from "../base-component";
import InputLabel from "../utils/input-label";
import { html } from "lit";

import styles from "./main.scss";

export class Input extends BaseComponent {
  static styles = styles;

  // Declare reactive properties
  static properties = {
    id: "",
    label: "",
    type: { type: String },
    value: { type: String },
  };

  constructor() {
    super();
    this.type = "text";
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      if (this.value && this.value.length > 0) {
        this.requestUpdate();
      } else {
        this.requestUpdate();
      }
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
        />
      </div>
    `;
  }
}

customElements.define("bsi-input", Input);
