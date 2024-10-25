import {LitElement} from 'lit';
// import styles from '../../bootstrap-italia/css/bootstrap-italia.min.css'


export class BaseComponent extends LitElement {

  // static styles = [styles]

  _composeClass(...classes) {
    let composedClass = ''
    classes.forEach(function (newClass) {
      composedClass += ' ' + newClass
    })
    return composedClass.trim()
  }
 
}
