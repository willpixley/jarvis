import { fetchWeatherApi } from 'openmeteo'
import { use, useEffect, useState } from 'react'
import icons from '../assets/weather_images.json'
import SmallClock from './SmallClock'

// https://open-meteo.com/en/docs#latitude=41.653614&longitude=-91.535774&current=temperature_2m,apparent_temperature,is_day,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&minutely_15=&hourly=&daily=&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&models=

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const params = {
      latitude: 41.653614,
      longitude: -91.535774,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'wind_speed_10m',
        'wind_direction_10m'
      ],
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'auto'
    }
    const url = 'https://api.open-meteo.com/v1/forecast'
    const fetchWeather = async () => {
      const responses = await fetchWeatherApi(url, params)

      const response = responses[0]

      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds()
      const timezone = response.timezone()
      const timezoneAbbreviation = response.timezoneAbbreviation()
      const latitude = response.latitude()
      const longitude = response.longitude()

      const current = response.current()

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const data = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0).value(),
          relativeHumidity2m: current.variables(1).value(),
          apparentTemperature: current.variables(2).value(),
          isDay: current.variables(3).value(),
          precipitation: current.variables(4).value(),
          rain: current.variables(5).value(),
          showers: current.variables(6).value(),
          snowfall: current.variables(7).value(),
          weatherCode: current.variables(8).value(),
          cloudCover: current.variables(9).value(),
          windSpeed10m: current.variables(10).value(),
          windDirection10m: current.variables(11).value(),
          icon: icons[current.variables(8).value()][current.variables(3).value() ? 'day' : 'night']
        }
      }
      setWeatherData(data.current)
      setIsLoading(false)
    }

    fetchWeather()
  }, [setWeatherData])
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-slate-300 w-full justify-center p-3 grid grid-cols-3 grid-rows-2 gap-4 h-screen">
      <div className="col-span-1 row-span-1 bg-inherit  border-2 border-slate-800 rounded-md">
        <h1 className="text-center">Iowa City</h1>
        <SmallClock />
      </div>
      <div className="col-span-2 row-span-1 bg-green-500">
        <div className="col-span-1 row-span-1 w-full flex ">
          <figure className="text-center">
            <img
              className=" border-2"
              src={weatherData.icon.image}
              alt={weatherData.icon.description}
            />
            <figcaption class="mt-2 text-sm text-gray-600">
              {weatherData.icon.description}
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="col-span-2 row-span-1 bg-red-500">Bottom Left</div>
      {/* Bottom right: 33% width */}
      <div className="col-span-1 row-span-1 bg-yellow-500">Bottom Right</div>
    </div>
  )
}
