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

// Add this controller function to your student-progress-controller.js
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Get all progress records for this user and course
    const progressRecords = await StudentProgress.find({ 
      studentId: userId, 
      courseId: courseId 
    }).populate('chapterId', 'title position');

    // Calculate summary statistics
    const completedChapters = progressRecords.filter(p => p.completed).length;
    const totalChapters = progressRecords.length;
    const progressPercentage = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

    // Transform to match frontend expectations
    const progressData = {
      userId,
      courseId,
      completedChapters,
      totalChapters,
      progressPercentage,
      chapters: progressRecords.reduce((acc, record) => {
        acc[record.chapterId._id] = {
          isCompleted: record.completed,
          completedAt: record.lastWatchedAt,
          chapterTitle: record.chapterId.title,
          position: record.chapterId.position
        };
        return acc;
      }, {})
    };

    res.json(progressData);
  } catch (error) {
    console.error('Course progress fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};