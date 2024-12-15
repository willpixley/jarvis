// server.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8888;

// Spotify credentials from .env file
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// Step 1: Redirect user to Spotify's authorization page
app.get('/login', (req, res) => {
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
});

// Step 2: Handle Spotify's callback and get the access token
app.get('/callback', async (req, res) => {
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

		const { access_token, refresh_token } = response.data;
		res.json({ access_token, refresh_token }); // Send access token to client or store for further use
	} catch (error) {
		console.error(error);
		res.status(400).send('Error getting tokens');
	}
});

// Step 3: Use the access token to make requests to the Spotify API
app.get('/play', async (req, res) => {
	//const { access_token } = req.query;
	const access_token =
		'BQBgIcJKqIWCl7Nk8ie9keiNO_lpg4xwXkpSiRz7Ao-a3jY1XPy4d-nLmw2FGab4Sd0ReKFeqS9Nb4hBUonDyzdBcf8b5QDRLPQJbw1iUCBhTMxOyCz6lztIUBPL2W8Gn9NDPslCKU7bcHeCfmm_GvzDYOtsjJtmkDmsnwKSMOGAqEZGbkmgiqzGhqw46V6-p138ez0-DP9buBYc';
	try {
		// Play a specific track
		const trackUri = 'spotify:track:5uRTAG2Fs6rQt41HwaIx53'; // Example track URI
		const response = await axios.put(
			'https://api.spotify.com/v1/me/player/play',
			{ uris: [trackUri] },
			{ headers: { Authorization: `Bearer ${access_token}` } }
		);

		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(400).send('Error playing track');
	}
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
