import express from 'express';

import {
	getMeasurements,
	getHistoricalMeasurements,
} from '../controllers/measurementController.js';

const router = express.Router();

//GET /api/measurements
router.get('/', getMeasurements);
router.get('/historical', getHistoricalMeasurements);

export default router;
