import express from 'express';
import { callback, login, play } from '../controllers/spotifyController.js';

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

//GET /api/spotify/login
router.get('/login', login);

// Step 2: Handle Spotify's callback and get the access token
router.get('/callback', callback);

// Step 3: Use the access token to make requests to the Spotify API
router.get('/play', play);

export default router;
