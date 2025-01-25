import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Dashboard from './screens/Dashboard'

const options = {
  snow: {
    key: 'snow',
    name: 'Snow',
    particles: {
      number: {
        value: 400,
        density: {
          enable: true
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 1
      },
      size: {
        value: 10
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'bottom',
        straight: true
      },
      wobble: {
        enable: true,
        distance: 10,
        speed: 10
      },
      zIndex: {
        value: {
          min: 0,
          max: 100
        },
        opacityRate: 10,
        sizeRate: 10,
        velocityRate: 10
      }
    },
    background: {
      color: '#333333'
    }
  },
  speedDecay: {
    key: 'speedDecay',
    name: 'Speed Decay',
    particles: {
      number: {
        value: 0
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5
      },
      size: {
        value: {
          min: 10,
          max: 15
        }
      },
      links: {
        enable: false
      },
      life: {
        duration: {
          sync: true,
          value: 5
        },
        count: 1
      },
      move: {
        enable: true,
        gravity: {
          enable: true
        },
        speed: 10,
        outModes: {
          default: 'bounce',
          bottom: 'bounce',
          left: 'destroy',
          right: 'destroy',
          top: 'none'
        },
        trail: {
          enable: true,
          fill: { color: '#000000' },
          length: 10
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
          mode: 'repulse',
          parallax: {
            enable: false,
            force: 60,
            smooth: 10
          }
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },
      modes: {
        grab: {
          distance: 400,
          links: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8
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
      color: '#000'
    },
    emitters: {
      direction: 'top',
      life: {
        count: 0,
        duration: 5,
        delay: 2
      },
      rate: {
        delay: 0.1,
        quantity: 1
      },
      size: {
        width: 0,
        height: 0
      },
      particles: {
        bounce: {
          vertical: {
            value: {
              min: 0.4,
              max: 0.8
            }
          }
        },
        color: {
          value: ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921']
        },
        links: {
          enable: false
        },
        size: {
          value: {
            min: 5,
            max: 10
          }
        },
        opacity: {
          value: 0.5
        },
        move: {
          speed: 30,
          decay: 0.1
        }
      }
    }
  },
  twinkle: {
    key: 'twinkle',
    name: 'Twinkle',
    particles: {
      number: {
        value: 80,
        density: {
          enable: true
        }
      },
      color: {
        value: '#ff0000'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5
        },
        animation: {
          enable: true,
          speed: 3,
          sync: false
        }
      },
      size: {
        value: {
          min: 0.1,
          max: 5
        },
        animation: {
          enable: true,
          speed: 20,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2
      },
      twinkle: {
        particles: {
          enable: true,
          color: '#ffff00',
          frequency: 0.05,
          opacity: 1
        },
        lines: {
          enable: true,
          color: '#ff0000',
          frequency: 0.005,
          opacity: 1
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },
      modes: {
        grab: {
          distance: 400,
          links: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8
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
      color: '#0d47a1'
    }
  },
  stars: {
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
}

const App = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = (container) => {
    console.log(container)
  }

  return (
    init && (
      <>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options.stars}
          className="z=0"
        />
        <Dashboard className="z-10" />
      </>
    )
  )
}

export default App
