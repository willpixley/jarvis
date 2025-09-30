import express from 'express';

import { getMeasurements } from '../controllers/measurementController.js';

const router = express.Router();

//GET /api/measurements
router.get('/', getMeasurements);

export default router;
