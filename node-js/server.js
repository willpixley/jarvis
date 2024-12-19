// server.js
import dotenv from 'dotenv';
import app from './app.js';
import { ApiService } from './ApiService.js';

dotenv.config();

const PORT = process.env.PORT;
async function startServer() {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
	try {
		const response = await fetch(ApiService.SPOTIFY_LOGIN);
		console.log('Success', response);
	} catch (e) {
		console.log(e);
	}
}

startServer();
