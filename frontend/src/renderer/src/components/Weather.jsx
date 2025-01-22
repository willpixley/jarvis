import { fetchWeatherApi } from 'openmeteo'
import { useEffect, useState } from 'react'
import icons from '../assets/weather_images.json'
import SmallClock from './SmallClock'
import { formatTime, formatDate } from '../lib/utils'
import sunrise from '../assets/weather/sunrise.svg'
import sunset from '../assets/weather/sunset.svg'
// https://open-meteo.com/en/docs#latitude=41.653614&longitude=-91.535774&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&minutely_15=&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&models=

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=41.653614&longitude=-91.535774&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation_probability,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto'
    const fetchWeather = async () => {
      //const responses = await fetchWeatherApi(url)
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      data['current']['icon'] =
        icons[data.current.weather_code][data.current.is_day ? 'day' : 'night']

      data.time_index = data.hourly.time.indexOf(data.current.time) + 1

      // Note: The order of weather variables in the URL query and the indices below need to match!
      setWeatherData(data)
      setIsLoading(false)
    }

    fetchWeather()
  }, [setWeatherData])
  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log('Weather data: ', weatherData)

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

            <div className="flex">
              <img src="../assets/weather/sunrise.svg'" />
              <p className="text-slate-400 font-semibold">Sunrise</p>
              <p className="text-slate-400 font-medium">
                {formatTime(weatherData.daily.sunrise[0])}
              </p>
            </div>
            <p className="text-slate-400 font-semibold">Sunset</p>
            <p className="text-slate-400 font-medium">{formatTime(weatherData.daily.sunset[0])}</p>
          </div>

          <div className="col-span-1 flex flex-col  border-x-2 border-slate-500 my-5   justify-center items-center w-full">
            <img
              src={weatherData.current.icon.image}
              alt={weatherData.current.icon.description}
              className="w-[75%] "
            />
            <p className="w-full text-center text-2xl font-sans text-slate-300 font-bold">
              {weatherData.current.icon.description}
            </p>
          </div>

          <div className="col-span-1 w-full text-slate-300 grid grid-cols-2 grid-rows-2 justify-center h-full place-items-center">
            <div className=" col-span-1 row-span-1 text-center pt-12 pl-10 ">
              <p className="font-semibold text-3xl">
                {Math.round(weatherData.daily.temperature_2m_min[0])}&deg;F
              </p>
              <p className="font-semibold text-slate-400 text-center text-sm">Low</p>
            </div>
            <div className="col-span-1 row-span-1 pt-12 pr-10">
              <p className="font-semibold text-3xl text-center">
                {Math.round(weatherData.daily.temperature_2m_max[0])}&deg;F
              </p>
              <p className="font-semibold text-slate-400 text-center text-sm">High</p>
            </div>
            <div className="col-span-1 row-span-1 pb-12 pl-10">
              <p className="font-semibold text-3xl text-center">
                {Math.round(weatherData.daily.wind_speed_10m_max[0])}
              </p>
              <p className="font-semibold text-slate-400 text-center text-sm">MPH</p>
            </div>
            <div className="col-span-1 row-span-1 pb-12 pr-10">
              <p className="font-semibold text-center text-3xl">
                {Math.round(weatherData.daily.uv_index_max[0])}
              </p>
              <p className="font-semibold text-slate-400 text-center text-sm">UV</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1 bg-slate-800 rounded-md p-5 flex gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="border-slate-500 w-[15%] h-full rounded-md border-2 flex flex-col justify-between items-center"
          >
            {/* Top content */}
            <div className="flex flex-col items-center">
              <p className="font-mono font-bold pt-6 text-center text-slate-300">10:00 PM</p>
              <img
                className="w-full mx-auto"
                src={
                  icons[weatherData.hourly.weather_code[i + weatherData.time_index]][
                    weatherData.hourly.is_day[i + weatherData.time_index] ? 'day' : 'night'
                  ]['image']
                }
              />
              <p className="text-center text-3xl font-semibold text-slate-300">
                {Math.round(weatherData.hourly.temperature_2m[i + weatherData.time_index])}&deg;F
              </p>
            </div>

            {/* Bottom content */}
            <div className="flex flex-col items-center pb-3">
              <img
                className="w-[30%] mx-auto"
                src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-19.png"
              />
              <p className="text-center font-semibold text-slate-400">
                {weatherData.hourly.precipitation_probability[i + weatherData.time_index]}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-1 row-span-1 bg-slate-800 rounded-md px-5">
        <p className="font-semibold text-xl text-slate-300 text-center pt-3">3 Day Outlook</p>
        {/* Begin on next day (i+1) */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className=" border-slate-500 w-full h-[22%] my-5 border-t-2 grid grid-cols-3 items-center"
          >
            <img
              className="col-span-1"
              src={icons[weatherData.daily.weather_code[i + 1]]['day']['image']}
            />
            <p className="col-span-1 text-center text-xl font-semibold text-slate-400">
              {Math.round(weatherData.daily.temperature_2m_max[i + 1])}&deg;F
            </p>
            <p className="col-span-1 text-center text-lg font-semibold text-slate-400">
              {formatDate(weatherData.daily.time[i + 1])}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
