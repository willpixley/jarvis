// server.js
import dotenv from 'dotenv';
import app from './app.js';
import cron from 'node-cron';
import { getTokensFromFile } from './lib/access.js';
//import { refreshAccessToken } from './controllers/spotifyController.js';

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
	console.log('RefereshToken', refreshToken);
	//await refreshAccessToken(refreshToken);
});
