// server.js
import dotenv from 'dotenv';
import app from './app.js';
import cron from 'node-cron';
import { getTokensFromFile, refreshAccessToken } from './lib/access.js';

dotenv.config();

const PORT = process.env.PORT;
async function startServer() {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

startServer();

cron.schedule('*/10 * * * * *', async function () {
	const { refreshToken } = await getTokensFromFile();
	console.log('Refreshtoken', refreshToken);
	await refreshAccessToken(refreshToken);
});
