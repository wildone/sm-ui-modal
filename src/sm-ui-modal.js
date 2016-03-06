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

  _activeChanged(active) {
    if (active) {
      this.fire('opened');
    } else {
      this.fire('closed');
    }
  }

  _computeHasBanner(title) {
    return !!title;
  }

  open() {
    this.active = true;
  }

  close() {
    this.active = false;
  }

  confirm() {
    this.active = false;
    this.fire('confirm');
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

  _closeOnEscape() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.close();
      }
    });
  }

  attached() {
    this._closeOnConfirm();
    this._closeOnOverlay();
    this._closeOnEscape();
  }

}

Polymer(SmUiModal);
