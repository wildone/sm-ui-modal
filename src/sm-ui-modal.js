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
      title: String,

      /**
       * Whether the user should be able to exit the modal without clicking confirm
       * @type {[type]}
       */
      noExit: Boolean,

      /**
       * Whether the modal has a banner
       * Computed from title
       * @type {Boolean}
       */
      _hasBanner: {
        type: Boolean,
        computed: '_computeHasBanner(title)',
        value: false
      }
    }
  }

  get behaviors() {
    return [
      animation,
      simpla.behaviors.active({
        observer: '_activeChanged'
      })
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
   * Compute value of the hasBanner property by coercing title property
   * @param  {String} title Current value of the title property
   * @return {Boolean}      Coerced boolean of title
   */
  _computeHasBanner(title) {
    return !!title;
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
    this.active = false;
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
    if (this.noExit) {
      return;
    }

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
