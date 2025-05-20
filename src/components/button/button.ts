import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseComponent } from '../../globals/base-component/base-component';

import styles from './button.scss?inline';

@customElement('bsi-button')
export class Button extends BaseComponent(styles) {
  static get formAssociated() {
    return true;
  }

  @property({ type: String }) private _buttonClasses = '';

  // @property({ type: Boolean }) private unresolved = true;
  @property({ type: String }) type = 'button';
  @property({ type: String }) label = '';
  @property({ type: String }) variant = '';
  @property({ type: Boolean }) outline = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';
  @property({ type: String }) icon = '';

  @property({ type: ElementInternals })
  internals = this.attachInternals();

  override firstUpdated(_changedProperties: PropertyValues): void {
    const button = this.renderRoot.querySelector('button');
    if (button) {
      this.addFocus(button);
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-resolved', '');
  }

  override createRenderRoot() {
    return this;
  }

  override updated(): void {
    this._buttonClasses = this.composeClass(
      'btn',
      this.outline ? '' : this.variant ? `btn-${this.variant}` : '',
      this.outline ? `btn-outline-${this.variant}` : '',
      this.disabled ? 'disabled' : ''
    );
  }

  surfaceSubmitEvent(event: Event): void {
    if (this.form) {
      event.preventDefault();
      event.stopPropagation();
      this.form.requestSubmit();
    }
  }

  get form() {
    return this.internals?.form ?? null;
  }

  override render() {
    return html`
      <button
        type=${this.type}
        class=${this._buttonClasses}
        ?disabled=${this.disabled}
        .value=${ifDefined(this.value || undefined)}
        @click=${this.type === 'submit' ? this.surfaceSubmitEvent : undefined}
        aria-label=${this.label}
      >
        <slot name="prefix"></slot>
        <span>${this.label}</span>
        <slot name="suffix"></slot>
      </button>
      <!-- fallback lives in lightDom and is up to user! -->
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bsi-button': Button;
  }
}
