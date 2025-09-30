// server.js
import dotenv from 'dotenv';
import app from './app.js';
import cron from 'node-cron';
import { getTokensFromFile, refreshAccessToken } from './lib/access.js';
import { fetchAndStoreMeasurements } from './lib/measure.js';

dotenv.config();

const PORT = process.env.PORT;
async function startServer() {
	fetchAndStoreMeasurements();
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

startServer();

cron.schedule('*/10 * * * *', async function () {
	const { refreshToken } = await getTokensFromFile();
	await refreshAccessToken(refreshToken);
});

// Take a measurement
cron.schedule('*/10 * * * *', fetchAndStoreMeasurements);
