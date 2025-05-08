import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseComponent } from '../../globals/base-component/base-component';

import styles from './card.scss?inline';

@customElement('bsi-card-image')
export class CardImage extends BaseComponent(styles) {
  @property() src = '';
  @property() alt = '';

  // static styles = css`
  //   figure {
  //     margin: 0;
  //   }
  // `;

  override render() {
    return html`
      <div class="img-responsive-wrapper">
        <div class="img-responsive">
          <figure class="img-wrapper">
            <img src=${this.src} alt=${this.alt} />
            <slot></slot>
            <!-- calendar etc -->
          </figure>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bsi-card-image': CardImage;
  }
}
