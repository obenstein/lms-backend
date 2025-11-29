import mongoose from "mongoose";

const liveSessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  invitees: [{ type:String }],
  joinLink: { type: String, required: true },
});

const LiveSessionModel = mongoose.model("LiveSession", liveSessionSchema);
export default LiveSessionModel;