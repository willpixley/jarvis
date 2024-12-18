import axios from 'axios';
import dotenv from 'dotenv';
import { getTokensFromFile, saveTokensToFile } from '../lib/access.js';
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
		saveTokensToFile(access_token, refresh_token, expires_in);
		res.status(200).send('Authenticated');
	} catch (error) {
		console.error(error);
		res.status(400).send('Error getting tokens');
	}
}

export async function play(req, res) {
	const { accessToken } = await getTokensFromFile();
	try {
		// Play a specific track
		const trackUri = 'spotify:track:7j3zZ2jAjzFD60UjhldhHo'; // Example track URI
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/play',
			{ uris: [trackUri] },
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);

		res.json(response.data);
	} catch (error) {
		console.error(error.response.data);
		res.status(400).send('Error playing track');
	}
}

export async function refreshAccessToken(refreshToken) {
	const tokenUrl = 'https://accounts.spotify.com/api/token';
	const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
		'base64'
	);

	const headers = {
		Authorization: `Basic ${credentials}`,
		'Content-Type': 'application/x-www-form-urlencoded',
	};

	const data = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
	});

	try {
		const response = await axios.post(tokenUrl, data, { headers });
		const newAccessToken = response.data.access_token;
		const newExpiresIn = response.data.expires_in;

		// Save the new access token and expiration time
		saveTokensToFile(newAccessToken, refreshToken, newExpiresIn);

		return { accessToken: newAccessToken };
	} catch (error) {
		console.error('Error refreshing token:', error);
		return null;
	}
}
