import Express from "express";
import {
  addChapter,
  deleteChapter,
  getAllChapters,
  getOneChapter,
  publishChapter,
  reorderChapter,
  updateChapterInfo,
  getPurchasedChapters,
  getPublishedChapterOfOneCourse,
  updateChapetrProgress,
  addChapterAttachment,
  deleteChapterAttachment,
  addChapterAssignment,
  deleteChapterAssignment,
} from "../controllers/chapter-controller.js";
const chapterRouter = Express.Router();

chapterRouter.get("/:courseId", getAllChapters);
chapterRouter.get("/:courseId/published", getPublishedChapterOfOneCourse);
chapterRouter.get("/:chapterId/course/:courseId", getOneChapter);
chapterRouter.get("/:chapterId/user/:userId", getPurchasedChapters);
chapterRouter.post("/", addChapter);
chapterRouter.post(
  "/:chapterId/course/:courseId/progress",
  updateChapetrProgress
);
chapterRouter.post("/:chapterId/attachments", addChapterAttachment);
chapterRouter.delete(
  "/:chapterId/attachments/:attachmentIdx",
  deleteChapterAttachment
);
chapterRouter.patch("/:chapterId/reorder", reorderChapter);
chapterRouter.patch("/:chapterId/course/:courseId", updateChapterInfo);
chapterRouter.patch("/:chapterId/course/:courseId/publish", publishChapter);
chapterRouter.delete("/:chapterId/course/:courseId", deleteChapter);
chapterRouter.post("/:chapterId/assignments", addChapterAssignment);
chapterRouter.delete(
  "/:chapterId/assignments/:assignmentIdx",
  deleteChapterAssignment
);
export default chapterRouter;
