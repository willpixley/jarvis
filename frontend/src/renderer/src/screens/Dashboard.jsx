import { useState } from 'react'
import Clock from '../components/Clock'
import useSwipe from '../lib/useSwipe'
import Weather from '../components/Weather'

export default function Dashboard() {
  const [tab, setTab] = useState(1)
  const tabs = [<Clock />, <Weather />]

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
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
      style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {tabs[tab]}
    </div>
  )
}
