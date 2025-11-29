import express from "express";
import {
  createSession,
  getSessionsByCourse,
  updateSession,
  deleteSession,
  getSessionById,
  getSessionsByStudent  
} from "../controllers/live-session-controller.js";

const router = express.Router();

router.post("/", createSession);                     // Create
// router.get("/:courseId", getSessionsByCourse);       // Read (by course)
router.put("/:id", updateSession);                   // Update
router.delete("/:id", deleteSession);                // Delete
router.get("/session/:id", getSessionById);     
router.get("/student/:studentId", getSessionsByStudent);    // Get session by ID
export default router;
