import { BaseComponent } from "../../globals/base-component/base-component";
import FormMixin from "../../globals/mixins/form"
import ValidityMixin from "../../globals/mixins/validity"

import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import styles from "./input.scss?inline";
import { ifDefined } from "lit/directives/if-defined";

@customElement('bsi-input')
export class Input extends ValidityMixin(FormMixin(BaseComponent(styles))) {
  
  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage: string = 'Please fill out this field';

  @property({ attribute: 'validity-message' })
  validityMessage: string = '';
  
  @query('input')
  protected _inputElement!: HTMLInputElement;

  @property({ type: String })
  label = '';

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  name = '';

  @property({ type: Boolean })
  disabled = false

  protected _value = '';

  @property({ reflect: true })
  get value() {
    // FIXME: Figure out how to deal with TS2611
    // once we have the input we can directly query for the value
    if (this._inputElement) {
      return this._inputElement.value;
    }
    // but before then _value will work fine
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    // make sure that lit-element updates the right properties
    this.requestUpdate('value', oldValue);
    // we set the value directly on the input (when available)
    // so that programatic manipulation updates the UI correctly
    if (this._inputElement) {
      this._inputElement.value = value;
    }
  }

  _handleFormdata(event: FormDataEvent) {
    // Add name and value to the form's submission data if it's not disabled.
    if (!this.disabled) {
      const { formData } = event;
      formData.append(this.name, this._value);
    }
  }

  override firstUpdated() {
    this.addFocus(this._inputElement)
  }

  handleInput(event: any) {
    this.value = event.target.value
  }

  // Render the UI as a function of component state
  override render() {
    return html`
      <div class="form-group">
        <input
          @input="${this.handleInput}"
          .type="${this.type}"
          id="${this.id || undefined}"
          name="${this.name}"
          disabled=${ifDefined(this.disabled || undefined)}
          .value="${this._value}" 
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