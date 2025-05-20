import { BaseComponent } from '../../globals/base-component/base-component';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './icon.scss?inline';

type UrlComposeFunction = (setId: string, iconName: string, path: string) => string;

class IconSet {
  static #instance: IconSet;

  private iconSets: Map<string, UrlComposeFunction> = new Map<string, UrlComposeFunction>();
  private setUrls: Map<string, string> = new Map<string, string>();

  private constructor() {}

  public static get instance(): IconSet {
    if (!IconSet.#instance) {
      IconSet.#instance = new IconSet();
    }
    return IconSet.#instance;
  }

  getIconUrl(iconName: string): string {
    const [setId, icon] = iconName.split(/\-(.*)/s);
    const urlGenerator = this.iconSets.get(setId);
    return urlGenerator ? urlGenerator(setId, icon, this.setUrls.get(setId) || '') : '';
  }

  add(id: string, serverUrl: string, urlComposeFunction?: UrlComposeFunction): void {
    let finalComposeFunction: UrlComposeFunction = (setId: string, iconName: string, path: string) => {
      return `${path}#${setId + '-' + iconName}`;
    };

    if (urlComposeFunction) {
      finalComposeFunction = urlComposeFunction;
    }
    this.setUrls.set(id, serverUrl);
    this.iconSets.set(id, finalComposeFunction);
  }
}

@customElement('bsi-icon')
export class Icon extends BaseComponent(styles) {
  @property({ type: String })
  type = 'primary';

  @property({ type: String })
  name = '';

  @property({ type: Boolean })
  background = false;

  static addIconSet(id: string, serverUrl: string, urlComposeFunction?: UrlComposeFunction) {
    IconSet.instance.add(id, serverUrl, urlComposeFunction);
  }

  // Render the UI as a function of component state
  override render() {
    return html`
      <svg class="icon icon-${this.type} ${this.background ? 'bg-' + this.background : ''}">
        <use href="${IconSet.instance.getIconUrl(this.name)}"></use>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bsi-icon': Icon;
  }
}
