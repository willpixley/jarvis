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
	setVolume,
} from '../controllers/spotifyController.js';

import {
	getCurrentlyPlaying,
	getPlayerInfo,
} from '../controllers/spotifyInfoControllers.js';

const router = express.Router();

//GET /api/spotify/login
router.get('/login', login);

router.get('/callback', callback);

router.get('/play', play);
router.get('/search/track', searchTrack);
router.get('/search/artist', searchArtist);
router.get('/search/playlist', searchPlaylist);

router.get('/control/back', backTrack);
// GET /api/spotify/control/pause
router.get('/control/next', nextTrack);
router.get('/control/pause', pauseTrack);
router.get('/control/play', resumeTrack);
router.post('/control/volume', setVolume);

router.get('/info/playing', getCurrentlyPlaying);
router.get('/info/player', getPlayerInfo);

export default router;
