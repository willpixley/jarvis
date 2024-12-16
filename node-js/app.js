import express from 'express';
import axios from 'axios';
import cors from 'cors';
import spotifyRoutes from './routes/spotifyRoutes.js';

const app = express();

app.use(
	cors({
		origin: 'http://localhost:5000',
		methods: ['POST', 'GET', 'PATCH'],
	})
);
app.use(express.json());

app.use('/api/spotify', spotifyRoutes);

export default app;
