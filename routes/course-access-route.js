import express from "express";
import {
  grantAccess,
  revokeAccess,
  getAccessListByCourse,
  getAccessListByStudent,
} from "../controllers/course-access-controller.js";

const router = express.Router();

router.post("/", grantAccess);
router.delete("/", revokeAccess);
router.get("/:studentId", getAccessListByStudent);
export default router;