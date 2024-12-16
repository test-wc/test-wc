import { BaseComponent } from "../base-component";
import { html } from "lit";

import styles from "./main.scss";

export class Button extends BaseComponent {
  static styles = styles;

  // Declare reactive properties
  static properties = {
    type: { type: String },
    variant: { type: String },
    _buttonClasses: { type: String },
    outline: { type: Boolean },
    disabled: { type: Boolean },
  };

  constructor() {
    super();
    this.type = "button";
    this.variant = "";
    this.outline = false;
    this.disabled = false;
  }

  firstUpdated() {
    this._buttonClasses = this._composeClass(
      "btn",
      this.outline ? "" : this.variant !== "" ? `btn-${this.variant}` : "",
      this.outline
        ? `${this.outline ? "btn-outline-" : ""}${this.variant}`
        : "",
      this.disabled ? "disabled" : ""
    );
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <button type="${this.type}" class="${this._buttonClasses}">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("bsi-button", Button);
