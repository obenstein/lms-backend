import StudentProgress from '../models/student-progress.js';

export const updateProgress = async (req, res) => {
  try {
    const { studentId, courseId, chapterId, completed } = req.body;
    const progress = await StudentProgress.findOneAndUpdate(
      { studentId, courseId, chapterId },
      { completed, lastWatchedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgressByStudent = async (req, res) => {
  try {
    const progress = await StudentProgress.find({ studentId: req.params.studentId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
