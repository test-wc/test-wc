import {LitElement, unsafeCSS} from 'lit';

export const BaseComponent = (style: any) => {
  return class extends LitElement {

    static styles = [unsafeCSS(style)];

    _composeClass(...classes: any) {
      let composedClass = ''
      classes.forEach((newClass: string) => {
        composedClass += ' ' + newClass
      })
      return composedClass.trim()
    }
  }
}