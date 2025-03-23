import { BaseComponent } from "../base-component/index";
import { html } from "lit";
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from "lit/directives/if-defined.js";

import styles from "./main.scss?inline";

@customElement('bsi-button')
export class Button extends BaseComponent(styles) {
  
  static get formAssociated() {
    return true;
  }

  @property({ type: String })
  private _buttonClasses = '';

  @property({ type: String })
  type = 'button'

  @property({ type: String })
  variant = ''

  @property({ type: Boolean })
  outline = false

  @property({ type: Boolean })
  disabled = false

  @property({ type: String })
  value = ''

  @property({ type: ElementInternals })
  internals = this.attachInternals()

  override updated() {
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
  override render() {
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

declare global {
  interface HTMLElementTagNameMap {
    'bsi-button': Button
  }
}


