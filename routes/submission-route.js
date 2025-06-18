import express from 'express';
import { submitAssignment,getSubmissionsByStudent } from '../controllers/submission-controller.js';
const router = express.Router();

router.post('/', submitAssignment);
router.get('/:studentId',getSubmissionsByStudent);

export default router;
