import { BaseComponent } from "../base-component/base-component";
import { html, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./input.scss?inline";

@customElement('bsi-input')
export class Input extends BaseComponent(styles) {
  
  private _inputElement: any;

  static get formAssociated() {
    return true;
  }

  @property({ type: String })
  id = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  @property({ type: ElementInternals })
  internals = this.attachInternals()

  updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("value")) {
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
    this._inputElement = this.renderRoot.querySelector("input");
    this.addFocus(this._inputElement)
  }

  handleInput() {
    this.value = this._inputElement.value;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="form-group">
        <label class="active" for="${this.id}">${this.label}</label>
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

declare global {
  interface HTMLElementTagNameMap {
    'bsi-input': Input
  }
}