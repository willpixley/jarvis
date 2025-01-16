import { useState, useEffect } from 'react'

export default function Clock() {
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date()

      let h = dateObject.getHours()
      setMin(dateObject.getMinutes())
      setSec(dateObject.getSeconds())
      h = h % 12
      if (h == 0) {
        setHour(12)
      } else {
        setHour(h)
      }

      setTime(currentTime)
    }, 1000)
  }, [])
  return (
    <>
      <div className="bg-slate-400 justify-between flex p-4">
        <div className="bg-slate-900 justify-center flex text-gray-100">{hour}</div>
        <div className="bg-slate-900 justify-center flex text-gray-100">{min}</div>
        <div className="bg-slate-900 justify-center flex text-gray-100">{sec}</div>
      </div>
    </>
  )
}
