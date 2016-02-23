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
      simpla.behaviors.active()
    ];
  }

  _computeHasBanner(title) {
    return !!title;
  }

  open() {
    this.active = true;
    this.fire = 'open';
  }

  close() {
    this.active = false;
    this.fire = 'close';
  }

  confirm() {
    this.active = false;
    this.fire = 'confirm';
  }

  getModal() {
    return this.$.modal;
  }

  _closeOnConfirm() {
    let confirm = Polymer.dom(this).querySelector(`.${CONFIRM_CLASS}`);
    if (confirm) {
      this.listen(confirm, 'tap', 'confirm');
    }
  }

  _closeOnOverlay() {
    if (this.noExit) {
      return;
    }

    this.listen(this.$.overlay, 'tap', 'close');
  }

  attached() {
    this._closeOnConfirm();
    this._closeOnOverlay();
  }

}

Polymer(SmUiModal);
