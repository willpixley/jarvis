import { useState, useEffect } from 'react'
import Clock from './Clock'
import useSwipe from '../hooks/useSwipe'
import Weather from './Weather'
import Music from './Music'
import News from './News'

export default function Dashboard() {
  const [dark, setDark] = useState(true)

  const darkModeHandler = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
  }

  const [tab, setTab] = useState(2)

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
    },
    onSwipedUp: () => {
      console.log('Swiped up')
    },
    onSwipedDown: () => {
      console.log('Swiped down')
      darkModeHandler()
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
