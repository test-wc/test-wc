import {LitElement, unsafeCSS} from 'lit';
import TrackFocus from '../utils/track-focus'

export const BaseComponent = (style: any) => {
  return class extends LitElement {

    static override styles = [unsafeCSS(style)];

    protected addFocus(element: HTMLElement) {
      new TrackFocus(element)
      console.log("STYLE")
      console.log(style)
      console.log("UNSAFE")

      console.log(unsafeCSS(style))
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