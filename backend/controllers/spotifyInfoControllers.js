import { getTokensFromFile, saveTokensToFile } from '../lib/access.js';
import axios from 'axios';

export async function getCurrentlyPlaying(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.get(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		// No need to call response.json(), axios automatically parses JSON
		const data = response.data;
		console.log(data);
		res.status(200).send(data); // Send the current track info as the response
	} catch (error) {
		console.error(
			'Error during playback:',
			error.response ? error.response.data : error
		);
		res.status(400).send('Error getting track info');
	}
}

export async function getPlayerInfo(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.get(
			'https://api.spotify.com/v1/me/player',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const data = response.data;
		console.log(data);
		res.status(200).send(data);
	} catch (error) {
		console.error(
			'Error getting player info:',
			error.response ? error.response.data : error
		);
		res.status(400).send('Error getting player info');
	}
}

export async function getDevices(req, res) {
	try {
		const { accessToken } = await getTokensFromFile();
		const response = await axios.get(
			'https://api.spotify.com/v1/me/player/devices',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const data = response.data;
		console.log(data);
		res.status(200).send(data);
	} catch (error) {
		console.error(
			'Error getting devices:',
			error.response ? error.response.data : error
		);
		res.status(400).send('Error getting devices');
	}
}
