import express from 'express';
import { updateProgress,getProgressByStudent } from '../controllers/student-progress-controller.js';
const router = express.Router();
router.post('/update', updateProgress);
router.get('/:studentId', getProgressByStudent);

export default router;
