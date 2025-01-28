export class ApiService {
  static SPOTIFY_SERVER = 'http://localhost:8888/api/spotify'
  static JBL_6 = '10:28:74:A2:BE:44'
  static SEARCH_TRACK = `${ApiService.SPOTIFY_SERVER}/search/track`
  static SEARCH_ARTIST = `${ApiService.SPOTIFY_SERVER}/search/artist`
  static SEARCH_PLAYLIST = `${ApiService.SPOTIFY_SERVER}/search/playlist`
}

export async function searchTrack(searchTerm) {
  try {
    console.log(`CAlled, ${ApiService.SEARCH_TRACK}?search=${searchTerm}`)
    const response = await fetch(`${ApiService.SEARCH_TRACK}?search=${searchTerm}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    //const data = await response.json() // Parse the JSON response
    return response // Return the parsed data
  } catch (e) {
    console.log('Error: ', e)
  }
}

export async function play() {
  try {
    const response = await fetch(`${ApiService.SPOTIFY_SERVER}/control/play`)
  } catch (e) {
    console.log('Error playing: ', e)
  }
}

export async function pause() {
  try {
    const response = await fetch(`${ApiService.SPOTIFY_SERVER}/control/pause`)
  } catch (e) {
    console.log('Error pausing: ', e)
  }
}

export async function backTrack() {
  console.log('previous track')
  try {
    const response = await fetch(`${ApiService.SPOTIFY_SERVER}/control/back`)
  } catch (e) {
    console.log('Error going back: ', e)
  }
}
export async function nextTrack() {
  console.log('next track')
  try {
    const response = await fetch(`${ApiService.SPOTIFY_SERVER}/control/next`)
  } catch (e) {
    console.log('Error skipping: ', e)
  }
}
