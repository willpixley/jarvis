export default function TemperatureGauge({ value, min = 0, max = 100 }) {
  const percent = Math.min(Math.max((value - min) / (max - min), 0), 1)

  const size = 200
  const radius = 80
  const stroke = 15
  const startAngle = -160
  const endAngle = -20
  const angleRange = endAngle - startAngle

  const angle = startAngle + percent * angleRange

  const polarToCartesian = (cx, cy, r, deg) => {
    const rad = (deg * Math.PI) / 180.0
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    }
  }

  const start = polarToCartesian(size / 2, size / 2, radius, startAngle)
  const end = polarToCartesian(size / 2, size / 2, radius, endAngle)
  const largeArcFlag = angleRange <= 180 ? '0' : '1'

  const bgPath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
  `

  const currentEnd = polarToCartesian(size / 2, size / 2, radius, angle)
  const progressPath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${currentEnd.x} ${currentEnd.y}
  `

  // Determine arc color
  let arcColor = 'blue'
  if (percent >= 2 / 3) arcColor = 'red'
  else if (percent >= 1 / 3) arcColor = 'green'

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size / 1.5}>
        {/* Background arc */}
        <path
          d={bgPath}
          stroke="#e5e7eb"
          strokeWidth={stroke - 1}
          fill="none"
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d={progressPath}
          stroke={arcColor}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Center temperature value */}
      <span className="absolute text-2xl font-bold text-inverse">{value}°</span>
    </div>
  )
}
