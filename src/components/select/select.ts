// src/components/form-select.ts
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseComponent } from '../../globals/base-component/base-component';
import FormMixin from '../../globals/mixins/form';
import ValidityMixin from '../../globals/mixins/validity';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './select.scss?inline';
type Option = string;
type GroupedOption = { groupName: string; options: Option[] };
type SelectOption = Option | GroupedOption;

function isGroupedOption(obj: SelectOption): obj is GroupedOption {
  return typeof obj !== 'string';
}
@customElement('bsi-select')
export class FormSelect extends ValidityMixin(FormMixin(BaseComponent(styles))) {
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) label: string = '';
  @property({ type: String }) selectedValue: string = '';
  @property({ type: Boolean, reflect: true })
  invalid = false;
  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage: string = 'Please fill out this field';
  @property({ attribute: 'validity-message' })
  validityMessage: string = '';
  @property({ type: Boolean, reflect: true })
  required = false;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: String })
  name = '';
  @property({ type: String })
  placeholder = '-- Select an option --';
  @query('select')
  protected _selectElement!: HTMLSelectElement;
  protected _value = '';

  @property({ reflect: true })
  get value() {
    // FIXME: Figure out how to deal with TS2611
    // once we have the input we can directly query for the value
    if (this._selectElement) {
      return this._selectElement.value;
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
    if (this._selectElement) {
      this._selectElement.value = value;
    }
  }

  _handleFormdata(event: FormDataEvent) {
    // Add name and value to the form's submission data if it's not disabled.
    if (!this.disabled) {
      const { formData } = event;
      formData.append(this.name, this._value);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    // this.addEventListener('change', this._onChange);
    this.addEventListener('blur', () => this.checkValidity(), true);
  }

  _onChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.selectedValue = select.value;
    this.checkValidity();
    select.classList.toggle('is-invalid', this.invalid);
    select.classList.toggle('is-valid', !this.invalid);
  };
  _renderGroupedOptions = (option: GroupedOption) => {
    return html`${option.options.map((o) => html`<option value="${o}" ?selected="${o === this.selectedValue}">${o}</option>`)}`;
  };

  override render() {
    return html`
      <div class="form-group">
        <div class="select-wrapper">
          ${this.label ? html`<label class="active" for="${ifDefined(this.id || undefined)}>${this.label}</label>` : ''}
          <select id="${ifDefined(this.id || undefined)}" name="${this.name}" required=${this.required} @input="${this._onChange}">
            >
            <option value="" disabled selected>${this.placeholder}</option>
            ${this.options.map((option) => {
              if (isGroupedOption(option)) {
                return html`<optgroup label="${option.groupName}">${this._renderGroupedOptions(option)}</optgroup>`;
              } else return html`<option value="${option}" ?selected="${option === this.selectedValue}">${option}</option>`;
            })}
          </select>
        </div>
      </div>
    `;
  }
}
