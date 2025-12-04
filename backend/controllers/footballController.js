import dotenv from 'dotenv';
import axios from 'axios';
import { devFootballData } from '../lib/devData.js';
dotenv.config();

const base_url = 'https://v1.american-football.api-sports.io/';
const cleanAxios = axios.create({
	headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY },
});
// have to get chicago date explicitly
function getToday() {
	const now = new Date();
	const chicagoDate = new Intl.DateTimeFormat('en-CA', {
		// 'en-CA' gives YYYY-MM-DD
		timeZone: 'America/Chicago',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(now);

	return chicagoDate;
}

export async function getCurrentGames(req, res) {
	try {
		const dev = req.query.dev;
		if (dev) {
			res.json(devFootballData);
			return;
		}
		const response = await cleanAxios.get(`${base_url}/games`, {
			params: {
				date: getToday(),
				league: 1,
				timezone: 'America/Chicago',
			},
		});
		const games = response.data.response;
		res.json({ games });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
}
