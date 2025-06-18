import Assignment from '../models/assignment.js';
export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(500).jSson({ message: error.message });
  }
};

export const getAssignmentsByCourse = async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
