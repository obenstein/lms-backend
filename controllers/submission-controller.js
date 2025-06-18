import Submission from '../models/submission.js'; 

export const submitAssignment = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubmissionsByStudent = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
