import animation from './behaviors/animation';

const CONFIRM_CLASS = 'modal-confirm';

class SmUiModal {
  beforeRegister() {
    this.is = 'sm-ui-modal';

    this.properties = {
      /**
       * Title of the modal
       * @type {String}
       */
      title: {
        type: String,
        value: ''
      },

      /**
       * Whether the user should be able to exit the modal without clicking confirm
       * @type {[type]}
       */
      noExit: Boolean,

      /**
       * Whether modal is active or not
       * @type {Boolean}
       */
      active: {
        type: Boolean,
        notify: true,
        value: false,
        observer: '_activeChanged'
      }
    }
  }

  get behaviors() {
    return [
      animation
    ];
  }

  /**
   * Observer for the active property, fires events on change
   * @param  {Boolean} active Current state of the active property
   * @return {undefined}
   */
  _activeChanged(active) {
    if (active) {
      this.fire('opened');
    } else {
      this.fire('closed');
    }
  }

  /**
   * Convinience method for setting active to true
   * @return {undefined}
   */
  open() {
    this.active = true;
  }

  /**
   * Convinience method for setting active to false
   * @return {undefined}
   */
  close() {
    if (!this.noExit) {
      this.active = false;
    }
  }

  /**
   * Set active true and fire 'confirmed' event
   * @return {undefined}
   */
  confirm() {
    this.active = false;
    this.fire('confirm');
  }

  /**
   * Public interface to fetch modal element
   * @return {undefined}
   */
  getModal() {
    return this.$.modal;
  }

  /**
   * Close the modal on confirm button tap
   * @return {undefined}
   */
  _closeOnConfirm() {
    let confirm = Polymer.dom(this).querySelector(`.${CONFIRM_CLASS}`);
    if (confirm) {
      this.listen(confirm, 'tap', 'confirm');
    }
  }

    /**
     * Close the modal on overlay tap
     * @return {undefined}
     */
  _closeOnOverlay() {
    this.listen(this.$.overlay, 'tap', 'close');
  }

  /**
   * Close the modal on escape key press
   * @return {undefined}
   */
  _closeOnEscape() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.close();
      }
    });
  }

  /**
   * Initialise close listeners on element attach
   * @return {undefined}
   */
  attached() {
    this._closeOnConfirm();
    this._closeOnOverlay();
    this._closeOnEscape();
  }

}

Polymer(SmUiModal);
