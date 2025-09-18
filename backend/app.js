import express from 'express';
import cors from 'cors';
import spotifyRoutes from './routes/spotifyRoutes.js';
import measurementRoutes from './routes/measurementRoutes.js';

//     const users = await knex('users').select('*');

const app = express();

const allowedOrigins = [
	'http://localhost:5000',
	'http://localhost:8888',
	'http://localhost:5173',
	'https://accounts.spotify.com',
	'accounts.spotify.com',
];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true); // Allow the origin
			} else {
				console.log('Rejected by CORS');
				callback(new Error('Not allowed by CORS')); // Reject the origin
			}
		},
		methods: ['POST', 'GET', 'PATCH'],
		credentials: true,
	})
);

app.use(express.json());

app.use('/api/spotify', spotifyRoutes);
app.use('/api/measurements', measurementRoutes);

export default app;
