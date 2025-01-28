import { useState, useEffect } from 'react'
import Pause from '../assets/music/Pause'
import AlbumLoading from '../components/AlbumLoading'
import Forward from '../assets/music/Forward'
import Back from '../assets/music/Back'
import Play from '../assets/music/Play'
import { formatSeconds } from '../lib/utils'
import { searchTrack, play, pause, backTrack, nextTrack, ApiService } from '../lib/spotify'
import axios from 'axios'

export default function Music() {
  const [song, setSong] = useState({
    artists: [],
    image: '',
    link: '',
    length: '',
    album: '',
    name: '',
    duration: 0,
    isPlaying: false
  })
  async function getCurrentlyPlaying() {
    try {
      const response = await axios.get(`${ApiService.SPOTIFY_SERVER}/info/playing`)
      const data = response.data
      const s = {
        name: data.item.name,
        isPlaying: data.is_playing,
        artists: data.item.artists.map((artist) => artist.name),
        image: data.item.album.images[1].url,
        duration: Math.floor(data.item.duration_ms / 1000),
        startedAt: Math.floor(data.progress_ms / 1000),
        album: data.item.album.name
      }
      setSong(s)
    } catch (e) {
      console.log('Error getting song info: ', e)
    }
  }
  useEffect(() => {
    getCurrentlyPlaying()
    setCurrentTime(song.startedAt)
    const interval = setInterval(() => {
      getCurrentlyPlaying()
    }, 1000)

    return () => clearInterval(interval) // Clean up on unmount
  }, [setSong])
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

  return (
    <div>
      <div className="w-screen h-screen bg-transparent flex flex-col items-center justify-center z-10 relative">
        {/* Image */}
        <div className="w-[20%] aspect-square">
          {song.image ? (
            <img src={song.image} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <AlbumLoading />
          )}
        </div>
        <div className="relative w-[50%] mt-4 mb-1 bg-slate-400 rounded-lg h-[0.5%]">
          <div
            className="absolute top-0 left-0 h-full bg-emerald-600 rounded-lg transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex w-[50%] justify-between text-sm text-slate-400">
          <p className="bg-[#111]">{formatSeconds(currentTime)}</p>
          <p className="bg-[#111]">{formatSeconds(song.duration)}</p>
        </div>

        {/* Text */}
        <p className="mt-4 text-slate-300 text-2xl font-music">{song.name}</p>
        <p className=" text-slate-400 text-xl font-music">{song.artists.join(', ')}</p>
        <div className="flex justify-between w-[30%] pt-5">
          <Back
            color="#CBD5E1"
            size="30px"
            className="active:fill-gray-400"
            onClick={() => {
              backTrack()
            }}
          />
          {song.isPlaying ? (
            <Pause
              color="#CBD5E1"
              size="30px"
              className="active:fill-gray-400"
              onClick={() => {
                pause()
              }}
            />
          ) : (
            <Play
              className="active:fill-gray-400"
              color="#CBD5E1"
              size="30px"
              onClick={() => {
                play()
              }}
            />
          )}
          <Forward
            color="#CBD5E1"
            size="30px"
            className="active:fill-gray-400"
            onClick={() => {
              nextTrack()
            }}
          />
        </div>
      </div>
    </div>
  )
}
