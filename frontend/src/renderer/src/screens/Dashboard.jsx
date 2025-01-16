import { useRef } from 'react'
import Clock from '../components/Clock'
import useSwipe from '../lib/useSwipe'

export default function Dashboard() {
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => console.log('left'),
    onSwipedRight: () => console.log('right')
  })

  return (
    <div {...swipeHandlers}>
      <Clock />
    </div>
  )
}
