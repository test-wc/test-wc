import {LitElement, unsafeCSS} from 'lit';
import TrackFocus from '../utils/track-focus.ts'

export const BaseComponent = (style: any) => {
  return class extends LitElement {

    static styles = [unsafeCSS(style)];

    protected addFocus(element: HTMLElement) {
      new TrackFocus(element)
    }

    protected composeClass(...classes: any) {
      let composedClass = ''
      classes.forEach((newClass: string) => {
        composedClass += ' ' + newClass
      })
      return composedClass.trim()
    }
  }
}