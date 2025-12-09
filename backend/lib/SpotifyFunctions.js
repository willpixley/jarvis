import axios from 'axios';
import { getTokensFromFile } from './access.js';

export async function getCurrentVolume() {
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

		const { device } = response.data;
		if (device) {
			const volume = device.volume_percent;
			return volume;
		} else {
			return -1;
		}
	} catch (e) {
		console.log('Error getting volume', e);
		return -1;
	}
}
