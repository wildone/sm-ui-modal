const easings = simpla._constants.easings;

export default {
  observers: [
    '_toggleModal(active)'
  ],

  /**
   * Animation observer for the active property
   * @param  {Boolean} active Current state of the active property
   * @return {undefined}
   */
  _toggleModal(active) {
    this.debounce('active-changing', () => {
      if (active) {
        this._openModal();
      } else {
        this._closeModal();
      }
    });
  },

  /**
   * Setup animations in a getter
   * @return {Array} Animation properties
   */
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

  /**
   * Animate the modal open and give it a visible attribute
   * @return {undefined}
   */
  _openModal(){
    this.toggleAttribute('visible', true);
    this._modalAnimations.forEach(({ target, frames, opts }) => {
      target.animate(frames, opts.open);
    });
  },


  /**
   * Animate the modal close and remove the visible attribute
   * @return {undefined}
   */
  _closeModal() {
    this._modalAnimations.forEach(({ target, frames, opts }) => {

      let animation = target.animate(frames.reverse(), opts.close);
      animation.onfinish = () => this.toggleAttribute('visible', false);
    });
  }

};
