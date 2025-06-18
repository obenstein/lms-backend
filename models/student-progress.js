import mongoose from 'mongoose';

const studentProgressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  completed: { type: Boolean, default: false },
  lastWatchedAt: { type: Date, default: Date.now }
});

const StudentProgress = mongoose.model('StudentProgress', studentProgressSchema);
export default StudentProgress;