import express from 'express';
import { createSession, getSessionsByCourse } from '../controllers/live-session-controller.js';
const router = express.Router();

router.post('/', createSession);
router.get('/:courseId', getSessionsByCourse);

export default router;
