import { useState, useEffect } from 'react'

const clockCss =
  'bg-gray-200 text-slate-800 font-bold font-mono p-6 rounded-md flex items-center justify-center w-[25vw] h-[25vh] text-9xl'

export default function Clock() {
  const [time, setTime] = useState({
    hour: '00',
    min: '00',
    sec: '00'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setTime({
        hour: String(now.getHours()).padStart(2, '0'),
        min: String(now.getMinutes()).padStart(2, '0'),
        sec: String(now.getSeconds()).padStart(2, '0')
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center h-screen w-full bg-slate-800">
      <div className="flex gap-4">
        <div className={clockCss}>{time.hour}</div>
        <div className={clockCss}>{time.min}</div>
        <div className={clockCss}>{time.sec}</div>
      </div>
    </div>
  )
}
