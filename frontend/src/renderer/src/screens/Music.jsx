import { useState } from 'react'
import AlbumLoading from '../components/AlbumLoading'

export default function Music() {
  const [song, setSong] = useState({
    artist: '',
    image: ''
  })
  return (
    <div className="w-screen h-screen  bg-background">
      <div className="w-[40%] items-center flex justify-center">
        <AlbumLoading className="rounded-lg " />
      </div>
    </div>
  )
}
