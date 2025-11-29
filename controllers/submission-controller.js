import Submission from '../models/submission.js'; 

export const submitAssignment = async (req, res) => {
  try {
    const { studentId, assignmentId, fileUrl, status, submittedAt } = req.body;

    if (!studentId || !assignmentId || !fileUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const submission = new Submission({
      studentId,
      assignmentId,
      fileUrl,
      status,
      submittedAt,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error("[SUBMIT_ASSIGNMENT]", error);
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
