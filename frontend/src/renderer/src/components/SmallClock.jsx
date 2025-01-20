import { useEffect, useState } from 'react'

export default function SmallClock() {
  const [time, setTime] = useState({
    hour: '00',
    min: '00',
    sec: '00'
  })

  const [dateInfo, setDateInfo] = useState({
    day: 'Sunday',
    date: 'January 1, 2025'
  })

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const h = now.getHours() === 12 || now.getHours() === 0 ? 12 : now.getHours() % 12
      setTime({
        hour: String(h),
        min: String(now.getMinutes()).padStart(2, '0'),
        sec: String(now.getSeconds()).padStart(2, '0')
      })

      setDateInfo({
        day: now.toLocaleDateString(undefined, { weekday: 'long' }),
        date: now.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
    }

    updateClock() // Update immediately on mount
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      <p className="font-mono font-bold text-6xl py-7 text-slate-300">
        {time.hour}:{time.min}
      </p>
      <p className="text-sm font-light text-slate-300">{dateInfo.day}</p>
      <p className="text-sm font-light text-slate-300">{dateInfo.date}</p>
    </div>
  )
}
