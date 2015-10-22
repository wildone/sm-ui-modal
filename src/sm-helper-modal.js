import animation from './helpers/animation';

class SmHelperModal {
  beforeRegister() {
    this.is = 'sm-helper-modal';
  }

  get behaviors() {
    return [
      animation,
      simpla.behaviors.active()
    ];
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
