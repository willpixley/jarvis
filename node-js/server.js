// server.js
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT;
async function startServer() {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

startServer();
