// server.js
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
