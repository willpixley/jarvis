import HumidityGauge from './HumidityGauge'

export default function PlantTile({ plants }) {
  return (
    <div className="w-[50%] h-full flex  justify-evenly items-center bg-primary rounded-2xl">
      {plants.map((plant, i) => (
        <div key={i}>
          <p>{plant.name}</p>
          <HumidityGauge value={plant.soil_moisture} />
        </div>
      ))}
    </div>
  )
}
