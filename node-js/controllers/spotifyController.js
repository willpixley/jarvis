import axios from 'axios';
import dotenv from 'dotenv';
import { getTokensFromFile, saveTokensToFile } from '../lib/access.js';
import { playGroupedTracks, playTrack } from '../lib/playFunctions.js';
dotenv.config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export async function login(req, res) {
	const scope =
		'user-library-read user-modify-playback-state user-read-playback-state';
	const params = new URLSearchParams({
		response_type: 'code',
		client_id: CLIENT_ID,
		scope: scope,
		redirect_uri: REDIRECT_URI,
	});
	const authURL = `https://accounts.spotify.com/authorize?${params.toString()}`;
	res.redirect(authURL);
}

export async function callback(req, res) {
	const { code } = req.query;

	const tokenURL = 'https://accounts.spotify.com/api/token';
	const tokenData = new URLSearchParams({
		code,
		redirect_uri: REDIRECT_URI,
		grant_type: 'authorization_code',
	});

	const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
		'base64'
	);

	try {
		const response = await axios.post(tokenURL, tokenData.toString(), {
			headers: {
				Authorization: `Basic ${authHeader}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const { access_token, refresh_token, expires_in } = response.data;
		console.log('Refresh token', refresh_token);
		saveTokensToFile(access_token, refresh_token, expires_in);
		res.status(200).send('Authenticated');
	} catch (error) {
		console.error(error);
		res.status(400).send('Error getting tokens');
	}
}

export async function play(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/play',
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
	} catch (error) {
		console.error('Error during playback:', error);
		res.status(400).send('Error playing track');
	}
}

export async function searchTrack(req, res) {
	const { accessToken } = await getTokensFromFile();
	//Should already be URL formatted
	const { search } = req.query;
	try {
		// Play a specific track
		const response = await axios.get(
			`https://api.spotify.com/v1/search?q=${search}&type=track&market=US`,
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		const { tracks } = response.data;
		const topTrack = tracks.items[0];
		await playTrack(topTrack.uri);
		res.status(200);
	} catch (error) {
		console.error(error.response.data);
		res.status(400).send('Error playing track');
	}
}

export async function searchArtist(req, res) {
	const { accessToken } = await getTokensFromFile();
	//Should already be URL formatted
	const { search } = req.query;
	try {
		// Play a specific track
		const response = await axios.get(
			`https://api.spotify.com/v1/search?q=${search}&type=artist&market=US`,
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		const { artists } = response.data;
		const topArtist = artists.items[0];
		playGroupedTracks(topArtist.uri);
		res.status(200).send(topArtist);
	} catch (error) {
		console.error(error.response.data);
		res.status(400).send('Error playing track');
	}
}

export async function searchPlaylist(req, res) {
	const { accessToken } = await getTokensFromFile();
	//Should already be URL formatted
	const { search } = req.query;
	try {
		// Play a specific track
		const response = await axios.get(
			`https://api.spotify.com/v1/search?q=${search}&type=playlist&market=US`,
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		const { playlists } = response.data;
		const topPlaylist = playlists.items[0];
		playGroupedTracks(topPlaylist.uri);
		res.status(200);
	} catch (error) {
		console.error(error.response.data);
		res.status(400).send('Error playing track');
	}
}

export async function backTrack(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.post(
			'https://api.spotify.com/v1/me/player/previous',
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
	} catch (error) {
		console.error('Error during playback:', error);
		res.status(400).send('Error playing track');
	}
}
export async function nextTrack(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.post(
			'https://api.spotify.com/v1/me/player/next',
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
	} catch (error) {
		console.error('Error during playback:', error);
		res.status(400).send('Error playing track');
	}
}
export async function pauseTrack(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/pause',
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
	} catch (error) {
		console.error('Error during playback:', error);
		res.status(400).send('Error playing track');
	}
}
export async function resumeTrack(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/play',
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
	} catch (error) {
		console.error('Error during playback:', error);
		res.status(400).send('Error playing track');
	}
}
