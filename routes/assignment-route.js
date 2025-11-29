import express from 'express';
import { createAssignment,getAssignmentsByChapter } from '../controllers/assignment-controller.js';
const router = express.Router();

router.post('/', createAssignment);
// router.get('/chapter/:chapterId', getAssignmentsByChapter);
router.get('/chapter/:assignmentId',getAssignmentsByChapter)
export default router;
