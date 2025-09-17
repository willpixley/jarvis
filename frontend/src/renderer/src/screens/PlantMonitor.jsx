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
      const data = await axios.get('http://192.168.4.146/api')
      console.log(data)
    }
    getData()
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
  return <p></p>
}
