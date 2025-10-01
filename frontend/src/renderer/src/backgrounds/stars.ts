export const stars = {
  key: 'star',
  name: 'Star',
  particles: {
    number: {
      value: 150,
      density: {
        enable: false
      }
    },
    color: {
      value: '#fff'
    },
    shape: {
      type: 'circle',
      options: {}
    },
    opacity: {
      value: {
        min: 0.1,
        max: 0.7
      },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false
      }
    },
    size: {
      value: {
        min: 1,
        max: 5
      },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false
      }
    },

    links: {
      enable: false,
      distance: 600,
      color: '#ffffff',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 0.1
    }
  },
  interactivity: {
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1,
          color: '#f00'
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        color: '#ffff00'
      },
      repulse: {
        distance: 200
      },
      push: {
        quantity: 4
      },
      remove: {
        quantity: 2
      }
    }
  },
  background: {
    color: '#111'
  }
}
