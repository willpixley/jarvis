import express from 'express';

import { getCurrentGames } from '../controllers/footballController.js';

const router = express.Router();

//GET /api/football/games
router.get('/games', getCurrentGames);

export default router;
