import express from 'express';
import { updateProgress,getProgressByStudent,getCourseProgress } from '../controllers/student-progress-controller.js';
const router = express.Router();
router.post('/update', updateProgress);
router.get('/:studentId', getProgressByStudent);
router.get('/course/:courseId', getCourseProgress); 

export default router;
