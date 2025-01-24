import React, { forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'

const Forward = forwardRef(({ color, size, ...rest }, ref) => {
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
        d="M22.74,9.25,9,.137V6.485L0,.057V23.943l9-6.428v6.428l13.741-9.811a3,3,0,0,0,0-4.882Z"
      />
    </svg>
  )
})

Forward.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Forward.displayName = 'Forward'

export default Forward
