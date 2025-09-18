import express from 'express';

import { getCurrentlyPlaying } from '../controllers/spotifyInfoControllers.js';

const router = express.Router();

//GET /api/measurements
router.get('/', getMeasurements);

export default router;
