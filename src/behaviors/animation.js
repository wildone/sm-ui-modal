const easings = simpla.constants.easings;

export default {
  observers: [
    '_toggleModal(active)'
  ],

  _toggleModal(active) {
    if (active) {
      this._openModal();
    } else {
      this._closeModal();
    }
  },

  get _modalAnimations() {
    let modal = this.$.modal,
        overlay = this.$.overlay;

    return [

      {
        target: modal,
        frames: [
          { transform: 'scale(0.75, 0.95)', opacity: 0 },
          { transform: 'scale(1, 1)', opacity: 1 }
        ],
        opts: {
          open: {
            easing: easings.easeOutCubic,
            fill: 'both',
            duration: 120,
          },
          close: {
            easing: easings.easeOutCubic,
            fill: 'both',
            duration: 100
          }
        }
      },

      {
        target: overlay,
        frames: [
          { opacity: 0 },
          { opacity: 1 }
        ],
        opts: {
          open: {
            easing: 'ease',
            fill: 'both',
            duration: 230
          },
          close: {
            fill: 'both',
            duration: 170
          }
        }
      }

    ]

  },

  _openModal(){
    this._modalAnimations.forEach(({ target, frames, opts }) => {

      this.toggleAttribute('visible', true);
      target.animate(frames, opts.open);
    });
  },

  _closeModal() {
    this._modalAnimations.forEach(({ target, frames, opts }) => {

      let animation = target.animate(frames.reverse(), opts.close);
      animation.onfinish = () => this.toggleAttribute('visible', false);
    });
  }

};
