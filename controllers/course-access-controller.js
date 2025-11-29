import CourseAccessModel from "../models/course-access.js";

export const grantAccess = async (req, res) => {
  try {
    const { studentId, courseId,title } = req.body;
    
    const access = new CourseAccessModel({ studentId, courseId,title });
    await access.save();
    res.status(201).json(access);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const revokeAccess = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const result = await CourseAccessModel.findOneAndDelete({ studentId, courseId });
    if (!result) return res.status(404).json({ message: "Access not found" });

    res.status(200).json({ message: "Access revoked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAccessListByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const accessList = await CourseAccessModel.find({ courseId }).populate("studentId");
    res.status(200).json(accessList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAccessListByStudent = async (req, res) => {
  console.log("getAccessListByStudent called");
  try {

    const { studentId } = req.params;

    const accessList = await CourseAccessModel.find({ studentId }).populate("courseId");
    res.status(200).json(accessList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

