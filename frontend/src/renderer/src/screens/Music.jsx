import { useState, useEffect } from 'react'
import Pause from '../assets/music/Pause'
import AlbumLoading from '../components/AlbumLoading'
import Forward from '../assets/music/Forward'
import Back from '../assets/music/Back'
import Play from '../assets/music/Play'
import { formatSeconds } from '../lib/utils'
import ParticleBackground from '../assets/music/ParticlesBackground'
export default function Music() {
  const [song, setSong] = useState({
    artist: 'Ms. Lauryn Hill',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/99/The_Miseducation_of_Lauryn_Hill.png',
    link: '',
    length: '',
    album: 'The Miseducation of Lauryn Hill',
    name: 'Ex-Factor',
    duration: 120
  })

  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const nextTime = prev + 0.1 // Update every 100ms
        return nextTime < song.duration ? nextTime : song.duration
      })
    }, 100) // Update every 100ms

    return () => clearInterval(interval) // Clean up on unmount
  }, [song.duration])
  const progressPercentage = (currentTime / song.duration) * 100

  const [isPaused, setIsPaused] = useState(true)
  return (
    <div>
      <div className="w-screen h-screen bg-transparent flex flex-col items-center justify-center z-10 relative">
        {/* Image */}
        <div className="w-[20%] aspect-square">
          {song.image ? (
            <img src={song.image} className="w-full h-full object-cover" />
          ) : (
            <AlbumLoading />
          )}
        </div>
        <div className="relative w-[50%] mt-4 mb-1 bg-slate-400 rounded-lg h-[0.5%]">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex w-[50%] justify-between text-sm text-slate-400">
          <p>{formatSeconds(currentTime)}</p>
          <p>{formatSeconds(song.duration)}</p>
        </div>

        {/* Text */}
        <p className="mt-4 text-slate-300 text-2xl font-music">{song.name}</p>
        <p className=" text-slate-400 text-xl font-music">{song.artist}</p>
        <div className="flex justify-between w-[30%] pt-5">
          <Back color="#CBD5E1" size="30px" className="active:fill-gray-400" />
          {isPaused ? (
            <Play
              className="active:fill-gray-400"
              color="#CBD5E1"
              size="30px"
              onClick={() => {
                setIsPaused(false)
              }}
            />
          ) : (
            <Pause
              color="#CBD5E1"
              size="30px"
              className="active:fill-gray-400"
              onClick={() => {
                setIsPaused(true)
              }}
            />
          )}
          <Forward color="#CBD5E1" size="30px" className="active:fill-gray-400" />
        </div>
      </div>
    </div>
  )
}
