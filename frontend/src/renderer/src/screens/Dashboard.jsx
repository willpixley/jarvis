import { useRef, useState } from 'react'
import Clock from '../components/Clock'
import useSwipe from '../lib/useSwipe'
import Weather from '../components/Weather'

export default function Dashboard() {
  const [tab, setTab] = useState(0)
  const tabs = [<Clock />, <Weather />]
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      if (tab < tabs.length - 1) {
        setTab(tab - 1)
      }
    },
    onSwipedRight: () => {
      if (tab >= 0) {
        setTab(tab + 1)
      }
    }
  })
  return <div {...swipeHandlers}>{tabs[tab]}</div>
}
