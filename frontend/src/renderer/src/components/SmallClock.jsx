import { useEffect, useState } from 'react'

export default function SmallClock() {
  const [time, setTime] = useState({
    hour: '00',
    min: '00',
    sec: '00'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const h = now.getHours() == 12 ? 12 : now.getHours() % 12
      setTime({
        hour: String(h),
        min: String(now.getMinutes()).padStart(2, '0'),
        sec: String(now.getSeconds()).padStart(2, '0')
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <p className="font-mono-700 text-2xl text-center">
      {time.hour}:{time.min}
    </p>
  )
}
