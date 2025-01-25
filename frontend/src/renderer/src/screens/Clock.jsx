import { useState, useEffect } from 'react'

const clockCss =
  'bg-gray-200 text-slate-800 font-bold font-mono p-6 rounded-md flex items-center justify-center w-[25vw] h-[25vh] text-9xl mix-blend-difference'

export default function Clock({ time }) {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-transparent z-10">
      <div className="flex gap-4">
        <div className={clockCss}>{time.hour}</div>
        <div className={clockCss}>{time.min}</div>
        <div className={clockCss}>{time.sec}</div>
      </div>
    </div>
  )
}
