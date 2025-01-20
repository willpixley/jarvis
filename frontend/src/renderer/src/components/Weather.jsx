import { fetchWeatherApi } from 'openmeteo'
import { useEffect, useState } from 'react'
import icons from '../assets/weather_images.json'
import SmallClock from './SmallClock'
import { formatTime } from '../lib/utils'
// https://open-meteo.com/en/docs#latitude=41.653614&longitude=-91.535774&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&minutely_15=&hourly=&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&models=

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

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
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m'
      ],
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'sunrise',
        'sunset',
        'uv_index_max',
        'precipitation_probability_max',
        'wind_direction_10m_dominant'
      ],
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'auto'
    }
    //const url = 'https://api.open-meteo.com/v1/forecast'
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=41.653614&longitude=-91.535774&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto'
    const fetchWeather = async () => {
      //const responses = await fetchWeatherApi(url)
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      data['current']['icon'] =
        icons[data.current.weather_code][data.current.is_day ? 'day' : 'night']

      // Note: The order of weather variables in the URL query and the indices below need to match!
      console.log(data)
      setWeatherData(data)
      setIsLoading(false)
    }

    fetchWeather()
  }, [setWeatherData])
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-slate-300 w-full justify-center p-4 grid grid-cols-3 grid-rows-2 gap-6 h-screen bg-gradient-to-br">
      <div className="col-span-1 row-span-1   bg-slate-800 rounded-lg flex flex-col justify-center items-center h-full shadow-lg">
        <h1 className="text-center text-slate-300 font-sans text-3xl ">Iowa City</h1>
        <SmallClock />
      </div>
      <div className="col-span-2 row-span-1 bg-slate-800 rounded-lg">
        <div className="col-span-1 row-span-1 grid grid-cols-3 h-full">
          <div
            id="temp"
            className="text-center col-span-1 w-full justify-center items-center flex flex-col h-full "
          >
            <p className="text-slate-300 text-6xl font-sans pb-2 font-bold">
              {Math.round(weatherData.current.temperature_2m)}&deg;F
            </p>
            <p className="text-slate-400 font-medium font-sans">
              Feels like {Math.round(weatherData.current.apparent_temperature)}&deg;F
            </p>
            <p className="text-slate-400 font-medium">
              Sunrise: {formatTime(weatherData.daily.sunrise[0])}
            </p>
            <p className="text-slate-400 font-medium">
              Sunset: {formatTime(weatherData.daily.sunset[0])}
            </p>
          </div>

          <div className="col-span-1 flex flex-col border-2 border-slate-300 my-5 rounded-md  justify-center items-center w-full">
            <img
              src={weatherData.current.icon.image}
              alt={weatherData.current.icon.description}
              className="w-[75%] "
            />
            <p className="w-full text-center text-2xl font-sans text-slate-300 font-bold">
              {weatherData.current.icon.description}
            </p>
          </div>

          <div className="col-span-1 w-full text-slate-300">Hello</div>
        </div>
      </div>
      <div className="col-span-2 row-span-1 bg-red-500">Bottom Left</div>
      {/* Bottom right: 33% width */}
      <div className="col-span-1 row-span-1 bg-yellow-500">Bottom Right</div>
    </div>
  )
}
