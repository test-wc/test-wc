import { BaseComponent } from "../base-component/base-component";
import { html } from "lit";
import { customElement, property } from 'lit/decorators.js'
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

import { ICONS_LIST } from "./icons";

import styles from "./icon.scss?inline";

@customElement('bsi-icon')
export class Icon extends BaseComponent(styles) {

  @property({ type: String })
  type = 'primary'

  @property({ type: String })
  name = ''

  @property({ type: Boolean })
  background = false

  // Render the UI as a function of component state
  override render() {
    return html`
      <svg class="icon icon-${this.type} ${this.background ? 'bg-' + this.background : ''}">
        ${unsafeHTML(ICONS_LIST[this.name])}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bsi-icon': Icon
  }
}


