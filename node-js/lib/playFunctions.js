import { getTokensFromFile, saveTokensToFile } from '../lib/access.js';
import axios from 'axios';

// play single track
export async function playTrack(uri) {
	const { accessToken } = await getTokensFromFile();
	console.log('Playing uri: ', uri);
	try {
		// Play a specific track
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/play',
			{ uris: [uri] },
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

// Could be artist, album, or playlist
export async function playGroupedTracks(uri) {
	const { accessToken } = await getTokensFromFile();
	console.log('Playing uri: ', uri);
	try {
		// Play a specific track
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/play',
			{ context_uri: uri },
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
