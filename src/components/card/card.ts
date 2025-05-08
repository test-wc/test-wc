import { html, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseComponent } from '../../globals/base-component/base-component';

import styles from './card.scss?inline';

type CardVariants = 'image' | 'base';

@customElement('bsi-card')
export class Card extends BaseComponent(styles) {
  @property({ type: String }) variant: CardVariants = 'base';
  @property({ type: String }) override title = '';
  @property({ type: String }) link = '';
  @property({ type: String }) imageSrc?: string;
  @property({ type: String }) imageAlt?: string;
  @property({ type: String }) date?: string;

  override render() {
    return html`
      <div class="card-wrapper">
        <div class="card card-img no-after">
          ${html`<slot name="image"
            >${ifDefined(this.imageSrc || nothing)
              ? html`
                  <bsi-card-image
                    .src=${this.imageSrc}
                    .alt=${ifDefined(this.imageAlt || 'Immagine')}
                  >
                    ${this.date
                      ? html`<bsi-card-calendar
                          .date=${this.date}
                        ></bsi-card-calendar>`
                      : nothing}
                  </bsi-card-image>
                `
              : nothing}</slot
          >`}

          <div class="card-body">
            <slot name="card-title"
              ><h3 class="card-title h5">${this.title}</h3></slot
            >
            <slot name="card-body"></slot>
            <slot name="card-link"
              >${ifDefined(this.link || nothing)
                ? html`
                    <a class="read-more" href=${this.link}>
                      <span class="text">Leggi di più</span>
                      <bsi-icon name="it-arrow-right" />
                    </a>
                  `
                : nothing}
            </slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bsi-card': Card;
  }
}
