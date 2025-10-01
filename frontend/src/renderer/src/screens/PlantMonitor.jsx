import { useEffect, useState } from 'react'
import axios from 'axios'
import MeasurementTabs from '../components/MeasurementTabs'
import PlantTile from '../components/PlantTile'

export default function PlantMonitor() {
  const [plantData, setPlantData] = useState({
    environment: {
      temperature: 0,
      humidity: 0,
      lux: 0
    },
    plants: [
      { name: 'Dracaena Fragrans', soil_moisture: 0 },
      { name: 'Moonlight Pilea', soil_moisture: 0 }
    ]
  })
  const mockPlants = [
    { name: 'Dracaena Fragrans', soil_moisture: 30 },
    { name: 'Moonlight Pilea', soil_moisture: 55 }
  ]

  useEffect(() => {
    async function getData() {
      const res = await axios.get('http://localhost:8888/api/measurements')
      setPlantData(res.data)
    }
    getData()
    // Get every 5 minutes
    const intervalId = setInterval(getData, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])
  return (
    <div className="z-20 flex flex-col justify-evenly w-full h-full">
      <div className="w-full h-[40%] flex flex-col items-center justify-center" id="environment">
        <div id="current-readings" className="flex justify-evenly w-full">
          <MeasurementTabs environment={plantData.environment} />
          <PlantTile plants={mockPlants} />
        </div>
      </div>
      <div className="w-full h-[40%]" id="plants"></div>
    </div>
  )
}
