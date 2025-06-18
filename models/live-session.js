import mongoose from "mongoose";

const liveSessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  invitees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  joinLink: { type: String, required: true },
});

const LiveSessionModel = mongoose.model("LiveSession", liveSessionSchema);
export default LiveSessionModel;