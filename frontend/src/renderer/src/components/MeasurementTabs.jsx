import { useState, useEffect } from 'react'
import TemperatureGauge from './TemperatureGauge'
import HumidityGauge from './HumidityGauge'

export default function MeasurementTabs({ environment }) {
  const [index, setIndex] = useState(0)

  const tabs = [
    {
      component: <TemperatureGauge value={Math.round(environment.temperature)} min={50} max={90} />,
      title: 'Temperature'
    },
    {
      component: <HumidityGauge value={Math.round(environment.humidity)} />,
      title: 'Humidity'
    },
    { component: <p>Lux</p>, title: 'Light level' }
  ]
  // switch dial tab
  useEffect(() => {
    function changeTab() {
      setIndex((prevIndex) => (prevIndex === tabs.length - 1 ? 0 : prevIndex + 1))
    }

    const intervalId = setInterval(changeTab, 5000) // every 5 seconds
    return () => clearInterval(intervalId)
  }, [tabs.length])

  return (
    <div className="w-72 aspect-square bg-primary rounded-2xl overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {tabs.map((tab, i) => (
          <div key={i} className="w-full flex-shrink-0 flex flex-col items-center justify-center">
            <h1 className="font-sans text-inverse font-extrabold text-xl absolute top-[10%]">
              {tab.title}
            </h1>
            <div className="mt-auto mb-auto pt-[17%]">{tab.component}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[8%] w-full flex justify-evenly" id="dots">
        {tabs.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${index === i ? 'bg-inverse' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>
    </div>
  )
}
