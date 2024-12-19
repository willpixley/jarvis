import express from 'express';
import {
	callback,
	login,
	play,
	searchTrack,
	searchArtist,
	searchPlaylist,
} from '../controllers/spotifyController.js';

const router = express.Router();

//GET /api/spotify/login
router.get('/login', login);

// Step 2: Handle Spotify's callback and get the access token
router.get('/callback', callback);

// Step 3: Use the access token to make requests to the Spotify API
router.get('/play', play);
router.get('/search/track', searchTrack);
router.get('/search/artist', searchArtist);
router.get('/search/playlist', searchPlaylist);

export default router;
