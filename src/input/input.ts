import { BaseComponent } from "../base-component/base-component";
import { html, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import styles from "./input.module.scss";

@customElement('bsi-input')
export class Input extends BaseComponent(styles) {
  
  @query('input')
  protected _inputElement!: HTMLInputElement;

  // static get formAssociated() {
  //   return true;
  // }

  @property({ type: String })
  id = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  type = 'text';

  protected _value = '';

  @property({ type: String })
  name = '';

  // @property({ type: ElementInternals })
  // internals = this.attachInternals()

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
    console.log(oldValue)
    this.requestUpdate('value', oldValue);
    // we set the value directly on the input (when available)
    // so that programatic manipulation updates the UI correctly
    if (this._inputElement) {
      this._inputElement.value = value;
    }
  }

  _handleFormData(event: FormDataEvent) {
    // Add our name and value to the form's submission 
    // data if we're not disabled.
    const { formData } = event;

    formData.append(this.name, this._value);
    console.log(this.name)
    console.log(this._value)
    console.log("DATAAAA")
  }


  // updated(_changedProperties: PropertyValues) {
  //   if (_changedProperties.has("value")) {
  //     this.internals.setFormValue(this.name, this.value);
  //     console.log(this.internals)
  //     this.notifyValueChanged();

  //     // if (this.value !== this._inputElement.value) {
  //     //   if (this.value) {
  //     //     this._inputElement.value = this.value;
  //     //   } else {
  //     //     this._inputElement.value = "";
  //     //   }
  //     // }
  //   }
  // }

  // notifyValueChanged() {
  //   let inputEvent = null;
  //   inputEvent = new Event("input", {
  //     bubbles: true,
  //     composed: true,
  //   });

  //   // Dispatched event to alert outside shadow DOM context of event firing.
  //   this.dispatchEvent(inputEvent);
  // }

  override connectedCallback() {
    super.connectedCallback();
    console.log("CONNECTED")
    if (this.closest('form')) {
      this.closest('form')?.addEventListener('formdata', this._handleFormData.bind(this));
    }
  }

  firstUpdated() {
    this.addFocus(this._inputElement)
    console.log("will load")
    // this.internals.setFormValue("a default value");
  }

  handleInput(event: any) {
    this.value = event.target.value
    // this.internals.setFormValue(event.target.value);
    // console.log(this.internals.form?.length)
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="form-group">
        <input
          @input="${this.handleInput}"
          .type="${this.type}"
          id="${this.id || undefined}"
          name="${this.name}"
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