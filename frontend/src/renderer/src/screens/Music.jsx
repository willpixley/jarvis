import { useState } from 'react'
import AlbumLoading from '../components/AlbumLoading'

export default function Music() {
  const [song, setSong] = useState({
    artist: 'Ms. Lauryn Hill',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/99/The_Miseducation_of_Lauryn_Hill.png',
    link: '',
    length: '',
    album: 'The Miseducation of Lauryn Hill',
    name: 'Ex-Factor'
  })
  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center">
      <div className="w-[20%] aspect-square flex justify-center items-center">
        {song.image ? (
          <img src={song.image} className="w-full h-full object-cover" />
        ) : (
          <AlbumLoading />
        )}
      </div>
      <p>{song.name}</p>
    </div>
  )
}
