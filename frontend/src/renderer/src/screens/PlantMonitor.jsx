import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PlantMonitor() {
  const [plantData, setPlantData] = useState({
    environment: {
      temperature: 0,
      humidity: 0,
      lightLevel: 0
    },
    plants: [{ name: 'Dracaena Fragrans', soilMoisture: 0 }]
  })
  useEffect(() => {
    async function getData() {
      const res = await axios.get('http://192.168.4.146/api')
      setPlantData(res.data)
      console.log(res.data)
    }
    getData()
    // Get every 15 minutes
    const intervalId = setInterval(getData, 15 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])
  // Response
  // {
  // 	"environment": {
  // 		"temperature": 74.84,
  // 		"humidity": 64,
  // 		"lightLevel": -2
  // 	},
  // 	"plants": [
  // 		{
  // 			"name": "Dracaena Fragrans",
  // 			"soilMoisture": 2494
  // 		}
  // 	]
  // }
  return (
    <div className="z-20">
      <p className="text-white">Hello</p>
    </div>
  )
}
