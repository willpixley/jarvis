import dotenv from 'dotenv';
import fs from 'fs';
import { refreshAccessToken } from '../controllers/spotifyController.js';
dotenv.config();

const getRefreshToken = async () => {
	// refresh token that has been previously stored
	const refreshToken = localStorage.getItem('refresh_token');
	const url = 'https://accounts.spotify.com/api/token';

	const payload = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: clientId,
		}),
	};
	const body = await fetch(url, payload);
	const response = await body.json();

	localStorage.setItem('access_token', response.accessToken);
	if (response.refreshToken) {
		localStorage.setItem('refresh_token', response.refreshToken);
	}
};
export const sendAuthRequest = async () => {
	var client_id = process.env.SPOTIFY_CLIENT_ID;
	var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization:
				'Basic ' +
				new Buffer.from(client_id + ':' + client_secret).toString(
					'base64'
				),
		},
		form: {
			grant_type: 'client_credentials',
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var token = body.access_token;
		}
	});
};

export async function getProfile(accessToken) {
	accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	const data = await response.json();
}

const path = './tokens.json';

export function saveTokensToFile(accessToken, refreshToken, expiresIn) {
	const tokens = {
		accessToken: accessToken,
		refreshToken: refreshToken,
		expiresIn: expiresIn,
		timestamp: Date.now(),
	};

	fs.writeFileSync(path, JSON.stringify(tokens));
}

export async function getTokensFromFile() {
	if (fs.existsSync(path)) {
		const data = fs.readFileSync(path);
		const tokens = JSON.parse(data);
		if (isTokenExpired(tokens)) {
			const newToken = await refreshAccessToken();
			return newToken;
		}
		return tokens;
	}
	console.log('No token found');
	return null;
}

export function isTokenExpired(tokens) {
	const currentTime = Date.now();
	const expirationTime = tokens.timestamp + tokens.expiresIn * 1000; // Convert seconds to milliseconds
	return currentTime >= expirationTime;
}
