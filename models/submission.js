import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['submitted', 'pending'], default: 'pending' },
  fileUrl: String
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;