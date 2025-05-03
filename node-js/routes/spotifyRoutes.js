import express from 'express';
import {
	callback,
	login,
	play,
	searchTrack,
	searchArtist,
	searchPlaylist,
	backTrack,
	nextTrack,
	pauseTrack,
	resumeTrack,
} from '../controllers/spotifyController.js';

import { getCurrentlyPlaying } from '../controllers/spotifyInfoControllers.js';

const router = express.Router();

//GET /api/spotify/login
router.get('/login', login);

router.get('/callback', callback);

router.get('/play', play);
router.get('/search/track', searchTrack);
router.get('/search/artist', searchArtist);
router.get('/search/playlist', searchPlaylist);

router.get('/control/back', backTrack);
router.get('/control/next', nextTrack);
router.get('/control/pause', pauseTrack);
router.get('/control/play', resumeTrack);

router.get('/info/playing', getCurrentlyPlaying);

export default router;
