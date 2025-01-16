import { useRef } from 'react'

export default (input) => {
  let touchStart = useRef(null)
  let touchEnd = useRef(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    touchEnd = 0 // otherwise the swipe is fired even with usual touch events
    touchStart = e.targetTouches[0].clientX
  }

  const onTouchMove = (e) => {
    touchEnd = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      input.onSwipedLeft()
    }
    if (isRightSwipe) {
      input.onSwipedRight()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
