import { useState } from 'react'
import Clock from './Clock'
import useSwipe from '../hooks/useSwipe'
import Weather from './Weather'
import Music from './Music'
import News from './News'
import PlantMonitor from './PlantMonitor'
import Football from './Football'

export default function Dashboard({ setIndex }) {
  const [tab, setTab] = useState(3)

  const tabs = [<Clock />, <Weather />, <Music />, <Football />, <PlantMonitor />, <News />, <></>]

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      if (tab < tabs.length - 1) {
        setTab(tab + 1) // Move to the next tab
      }
    },
    onSwipedRight: () => {
      if (tab > 0) {
        setTab(tab - 1) // Move to the previous tab
      }
    },
    onSwipedUp: () => {
      setIndex((prevIndex) => (prevIndex - 1 + tabs.length) % tabs.length)
    },
    onSwipedDown: () => {
      setIndex((prevIndex) => (prevIndex + 1) % tabs.length)
    }
  })

  return (
    <div
      className="z-10 ease-in-out"
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
      style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {tabs[tab]}
    </div>
  )
}
