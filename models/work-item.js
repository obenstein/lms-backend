import mongoose from "mongoose";
const workItemSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['note', 'reminder', 'todo'], default: 'todo' },
  createdAt: { type: Date, default: Date.now },
  dueAt: Date,
  completed: { type: Boolean, default: false }
});

const WorkItem = mongoose.model('WorkItem', workItemSchema);
export default WorkItem;  