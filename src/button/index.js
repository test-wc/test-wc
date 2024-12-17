import { BaseComponent } from "../base-component";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./main.scss";

export class Button extends BaseComponent {
  static styles = styles;
  static get formAssociated() {
    return true;
  }

  // Declare reactive properties
  static properties = {
    type: { type: String },
    variant: { type: String },
    _buttonClasses: { type: String },
    outline: { type: Boolean },
    disabled: { type: Boolean },
    value: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.type = "button";
    this.variant = "";
    this.outline = false;
    this.disabled = false;
    this.value = undefined;
    this.internals = this.attachInternals();
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
    const {
      internals: { form },
    } = this;
    if (this.type === 'submit') {
      this.renderRoot
        .querySelector("button")
        .addEventListener("click", () => form.requestSubmit());
    }
  }

  updated() {
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
      <button
        type="${this.type}"
        class="${this._buttonClasses}"
        @click="${ifDefined(() => {})}"
        .value="${ifDefined(this.value ? this.value : undefined)}"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("bsi-button", Button);
