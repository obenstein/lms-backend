import express from 'express';
import { createWorkItem,getWorkItems } from '../controllers/work-item-controller.js';
const router = express.Router();

router.post('/', createWorkItem);
router.get('/:studentId', getWorkItems);

export default router;
