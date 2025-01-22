import { useState, useEffect } from 'react'
import Clock from '../components/Clock'
import useSwipe from '../lib/useSwipe'
import Weather from '../components/Weather'

export default function Dashboard() {
  const [tab, setTab] = useState(0)
  const [time, setTime] = useState({
    hour: '00',
    min: '00',
    sec: '00'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const h = now.getHours() == 12 || now.getHours == 0 ? 12 : now.getHours() % 12
      setTime({
        hour: String(h).padStart(2, '0'),
        min: String(now.getMinutes()).padStart(2, '0'),
        sec: String(now.getSeconds()).padStart(2, '0')
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  const tabs = [<Clock time={time} />, <Weather />]

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
