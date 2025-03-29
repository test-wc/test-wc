/**
 * @param Base The base class.
 * @returns A mix-in to handle `formdata` event on the containing form.
 */
const FormMixin = <TBase extends Constructor<HTMLElement>>(Base: TBase) => {
    /**
     * A mix-in class to handle `formdata` event on the containing form.
     */
    abstract class FormMixinImpl extends Base {
  
      /**
       * Handles `formdata` event.
       *
       * @param event The event.
       */
      abstract _handleFormdata(event: Event): void;

      connectedCallback() {
        // @ts-ignore
        super.connectedCallback();
        if (this.closest('form')) {
          this.closest('form')?.addEventListener('formdata', this._handleFormdata.bind(this));
        }
      }
  
      disconnectedCallback() {
        // if (this._hFormdata) {
        //   this._hFormdata = this._hFormdata.release();
        // }
        // @ts-ignore
        super.disconnectedCallback();
      }
    }
    return FormMixinImpl;
  };
  
  export default FormMixin;