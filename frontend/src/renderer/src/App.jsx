import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Dashboard from './screens/Dashboard'
import { amongUs, snow, stars, twinkle, test } from './backgrounds'

const bgOptions = [twinkle, stars, amongUs, snow]
const App = () => {
  const [init, setInit] = useState(false)
  const [index, setIndex] = useState(0)

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
          options={bgOptions[index]}
          className="z=0"
        />
        <Dashboard setIndex={setIndex} arrLength={bgOptions.length} className="z-10" />
      </>
    )
  )
}

export default App
