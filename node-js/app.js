import express from 'express';
import cors from 'cors';
import spotifyRoutes from './routes/spotifyRoutes.js';

const app = express();

const allowedOrigins = ['http://localhost:5000', 'http://localhost:8888'];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true); // Allow the origin
			} else {
				callback(new Error('Not allowed by CORS')); // Reject the origin
			}
		},
		methods: ['POST', 'GET', 'PATCH'],
	})
);

app.use(express.json());

app.use('/api/spotify', spotifyRoutes);

export default app;
