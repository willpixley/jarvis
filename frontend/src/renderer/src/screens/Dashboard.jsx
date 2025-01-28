import { useState, useEffect } from 'react'
import Clock from './Clock'
import useSwipe from '../lib/useSwipe'
import Weather from './Weather'
import Music from './Music'
import News from './News'

export default function Dashboard() {
  const [tab, setTab] = useState(3)

  const tabs = [<Clock />, <Weather />, <Music />, <News />]

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
    }
  })

  return (
    <div
      className="z-10"
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
      style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {tabs[tab]}
    </div>
  )
}
