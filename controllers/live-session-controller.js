import LiveSessionModel from '../models/live-session.js'; 

export const createSession = async (req, res) => {
  try {
    const session = new LiveSessionModel(req.body);
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionsByCourse = async (req, res) => {
  try {
    const sessions = await LiveSessionModel.find({ courseId: req.params.courseId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
