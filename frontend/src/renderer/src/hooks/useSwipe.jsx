import { useRef } from 'react'

export default (input) => {
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)
  const touchStartY = useRef(null)
  const touchEndY = useRef(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    touchEndX.current = null // Reset the end point
    touchStartX.current = e.targetTouches[0].clientX // Store the start point
    touchEndY.current = null // Reset the end point
    touchStartY.current = e.targetTouches[0].clientY // Store the start point
  }

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX // Update the current point
    touchEndY.current = e.targetTouches[0].clientY
  }

  const onTouchEnd = () => {
    if (
      (touchStartX.current === null || touchEndX.current === null) &&
      (touchStartY.current === null || touchEndY.current === null)
    )
      return

    const xDistance = touchStartX.current - touchEndX.current
    const yDistance = touchStartY.current - touchEndY.current
    const isLeftSwipe =
      Math.abs(xDistance) > Math.abs(yDistance) ? xDistance > minSwipeDistance : false
    const isRightSwipe =
      Math.abs(xDistance) > Math.abs(yDistance) ? xDistance < -minSwipeDistance : false
    const isDownSwipe =
      Math.abs(xDistance) < Math.abs(yDistance) ? yDistance > minSwipeDistance : false
    const isUpSwipe =
      Math.abs(xDistance) < Math.abs(yDistance) ? yDistance < -minSwipeDistance : false

    if (isLeftSwipe) {
      input.onSwipedLeft?.()
    }
    if (isRightSwipe) {
      input.onSwipedRight?.()
    }
    if (isDownSwipe) {
      input.onSwipedDown?.()
    }
    if (isUpSwipe) {
      input.onSwipedUp?.()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
