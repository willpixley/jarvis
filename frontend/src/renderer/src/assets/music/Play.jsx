import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Play = forwardRef(({ color, size, ...rest }, ref) => {
  const mergedProps = {
    color: color ?? 'currentColor',
    size: size ?? '20px',
    ...rest
  }
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 24 24"
      fill={mergedProps.color}
      {...mergedProps}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
      />
    </svg>
  )
})

Play.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Play.displayName = 'Play'

export default Play
