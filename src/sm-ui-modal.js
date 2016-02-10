import animation from './behaviors/animation';

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
  }

  close() {
    this.active = false;
  }

  getModal() {
    return this.$.modal;
  }

}

Polymer(SmUiModal);
