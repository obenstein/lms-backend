import mongoose from "mongoose";

const courseAccessSchema = new mongoose.Schema({
  studentId: { type:String, required: true },
  courseId: { type: String,  required: true },
  grantedAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
});

courseAccessSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const CourseAccessModel = mongoose.model("CourseAccess", courseAccessSchema);
export default CourseAccessModel;
