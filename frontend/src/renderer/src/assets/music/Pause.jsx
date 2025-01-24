import React, { forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'

const Pause = forwardRef(({ color, size, ...rest }, ref) => {
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
      fill={mergedProps.color} // Ensure fill is set
      {...mergedProps}
    >
      <path d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0Z" />
      <path d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0Z" />
    </svg>
  )
})

Pause.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Pause.displayName = 'Pause'

export default Pause
