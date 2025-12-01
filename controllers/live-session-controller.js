import LiveSessionModel from "../models/live-session.js";

// Create a new session
export const createSession = async (req, res) => {
  console.log("createSession called with body:", req.body);
  try {
    const session = new LiveSessionModel(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sessions for a course
export const getSessionsByCourse = async (req, res) => {
  try {
    const sessions = await LiveSessionModel.find({ courseId: req.params.courseId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a session by ID
export const updateSession = async (req, res) => {
  try {
    const session = await LiveSessionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a session by ID
export const deleteSession = async (req, res) => {
  try {
    const session = await LiveSessionModel.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await LiveSessionModel.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getSessionsByStudent = async (req, res) => {
  try {
    console.log(req.params)
    const studentId = req.params.studentId;

    const sessions = await LiveSessionModel.find({
      invitees: studentId,
    }).sort({ startTime: -1 }); // optional: show latest first
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
