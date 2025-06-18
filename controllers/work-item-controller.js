import WorkItem from '../models/work-item.js'; 

export const createWorkItem = async (req, res) => {
  try {
    const item = new WorkItem(req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkItems = async (req, res) => {
  try {
    const items = await WorkItem.find({ studentId: req.params.studentId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
