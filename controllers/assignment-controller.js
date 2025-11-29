import Assignment from '../models/assignment.js';
export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignmentsByChapter = async (req, res) => {
  try {
    const assignments = await Assignment.find({ _id: req.params.assignmentId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
