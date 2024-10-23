import {BaseComponent} from '../base-component';
import onDocumentScroll from '../utils/on-document-scroll.js'
import {html} from 'lit';

import styles1 from '../../bootstrap-italia/scss/custom/_back-to-top.scss'

const CLASS_NAME_SHOW = 'back-to-top-show'
const CLASS_NAME = 'back-to-top'

export class BackToTop extends BaseComponent {

  static styles = [styles1]

  // Declare reactive properties
  static properties = {
    small: false,
    shadow: false,
    dark: false
  };

  firstUpdated() {
    this._element = this.renderRoot.querySelector(`.${CLASS_NAME}`);
    this._scrollCb = onDocumentScroll(() => this.toggleShow())
  }

  toggleShow() {
    if (document.scrollingElement && typeof document !== 'undefined' && document.scrollingElement.scrollTop > 100) {
      this.show()
    } else {
      this.hide()
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <a href="#" aria-hidden="true" tabindex="-1" class="back-to-top ${this.small ? 'back-to-top-small' : ''} ${this.shadow ? 'shadow' : ''}">
        <bsi-icon name='it-arrow-up' type='light'></bsi-icon>
      </a>        
    `;
  }

  show() {
    if (this._element) {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.add(CLASS_NAME_SHOW)
      }
    }
  }

  hide() {
    if (this._element) {
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW)
      }
    }
  }
}

customElements.define('bsi-back-to-top', BackToTop);
