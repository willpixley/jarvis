import { useRef } from 'react'

export default (input) => {
  const touchStart = useRef(null)
  const touchEnd = useRef(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    touchEnd.current = null // Reset the end point
    touchStart.current = e.targetTouches[0].clientX // Store the start point
  }

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX // Update the current point
  }

  const onTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return

    const distance = touchStart.current - touchEnd.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      input.onSwipedLeft?.()
    }
    if (isRightSwipe) {
      input.onSwipedRight?.()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
