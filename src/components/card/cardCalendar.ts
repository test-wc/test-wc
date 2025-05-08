import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseComponent } from '../../globals/base-component/base-component';

import styles from './card.scss?inline';

@customElement('bsi-card-calendar')
export class CardCalendar extends BaseComponent(styles) {
  @property() date = ''; // ISO string

  get day() {
    const d = new Date(this.date);
    return d.getDate();
  }

  get month() {
    return new Date(this.date).toLocaleString('it-IT', { month: 'long' });
  }

  override render() {
    return html`
      <div class="calendar">
        <span>${this.day}</span>
        <span>${this.month}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bsi-card-calendar': CardCalendar;
  }
}
