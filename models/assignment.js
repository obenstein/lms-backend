import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  createdBy: {
    type: String, // <-- changed from ObjectId to String
    required: true,
  },
  fileUrl: String,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
