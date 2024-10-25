const EVENT_FOCUS = `focus`
const EVENT_BLUR = `blur`
const EVENT_CHANGE = `change`

const CLASS_NAME_ACTIVE = 'active'

class InputLabel {
  constructor(element, root) {
    this._element = element
    this._root = root
    this._init()
  }

  static getInputFromLabel = (labelElement) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      return this._root.querySelector('#' + CSS.escape(labelElement.getAttribute('for')))
    }
  }

  // Public

  // Private
  _init() {
    const label = this._getLabel()
    if (label && !label.classList.contains(CLASS_NAME_ACTIVE)) {
      //script disabled if active on init
      this._labelOut()
      this._labelOver()
    }

    if (label && label.getAttribute('it-bs-static') === null) {
      this._bindEvents()
    }
  }

  _bindEvents() {
    if (['date', 'time'].includes(this._element.getAttribute('type'))) {
      return
    }
    if (this._element.getAttribute('type') === 'file') {
      this._element.addEventListener(EVENT_BLUR, () => {
        this._labelOut()
      })
    } else {
      this._element.addEventListener(EVENT_FOCUS, () => {
        this._labelOut()
      })
      this._element.addEventListener(EVENT_BLUR, () => {
        this._labelOver()
      })
      this._element.addEventListener(EVENT_CHANGE, () => {
        this._labelToggle()
      })
    }
  }

  _getLabel() {
    return this._root.querySelector('label[for="' + this._element.getAttribute('id') + '"]')
  }

  _isEmpty() {
    return !this._element.value && !this._element.getAttribute('placeholder')
  }

  _labelOut() {
    const label = this._getLabel()
    if (label) {
      label.classList.add(CLASS_NAME_ACTIVE)
    }
  }
  _labelOver() {
    if (this._isEmpty()) {
      const label = this._getLabel()
      if (label) {
        label.classList.remove(CLASS_NAME_ACTIVE)
      }
    }
  }
  _labelToggle() {
    if (!this._isEmpty()) {
      this._labelOut()
    } else {
      this._labelOver()
    }
  }
}

export default InputLabel
