
import express from 'express';
import { ingestData } from '../controllers/ingestionController';

const router = express.Router();

router.post('/', ingestData);

export default router;
