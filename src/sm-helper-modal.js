import animation from './helpers/animation';

class SmHelperModal {
  beforeRegister() {
    this.is = 'sm-helper-modal';

    this.properties = {
      title: String,
      hasBanner: {
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

Polymer(SmHelperModal);
