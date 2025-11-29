import chapterModel from "../models/chapter-model.js";

export const getAllChapters = async (req, res) => {
  try {
    const { courseId } = req.params;
    const chapters = await chapterModel
      .find({ courseId })
      .sort({ position: 1 });

    res.status(200).json(chapters);
  } catch (error) {
    return res.status(500).json({ msg: "chapter get all ", error });
  }
};

export const getPublishedChapterOfOneCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const chapters = await chapterModel.find({ courseId, isPublished: true });

    res.status(200).json(chapters);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "get published chapter of course", error });
  }
};

export const getOneChapter = async (req, res) => {
  try {
    const { chapterId, courseId } = req.params;
    const chapter = await chapterModel.findOne({
      _id: chapterId,
      courseId: courseId,
    });

    res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "get one chapter", error });
  }
};

export const getPurchasedChapters = async (req, res) => {
  try {
    const { chapterId, userId } = req.params;
  } catch (error) {
    return res.status(500).json({ msg: "get purchased chapters", error });
  }
};

export const addChapter = async (req, res) => {
  try {
    const chapter = await chapterModel.create({ ...req.body });
    res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "add chapter", error: error.message });
  }
};

export const reorderChapter = async (req, res) => {
  try {
    const { position, courseId } = req.body;
    const { chapterId } = req.params;
    const chapter = await chapterModel.findOneAndUpdate(
      { _id: chapterId, courseId: courseId },
      { $set: { position: position } },
      { new: true }
    );
    res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "reordr chapter", error });
  }
};

export const publishChapter = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    const { isPublished } = req.body;
    const chapter = await chapterModel.findOneAndUpdate(
      { _id: chapterId, courseId },
      isPublished,
      { new: true }
    );

    res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "publish chapter", error });
  }
};

export const updateChapetrProgress = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    const { userId, isCompleted } = req.body;
    const chapter = await chapterModel.findOne({ _id: chapterId, courseId });
    await chapter.isCompleted.set(userId, isCompleted);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "update chapter progress", error: error.message });
  }
};

export const updateChapterInfo = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    const { userId } = req.body;
    const chapter = await chapterModel.findOneAndUpdate(
      { _id: chapterId, courseId: courseId, userId: userId },
      { ...req.body },
      { new: true }
    );

    res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "update chapter info", error });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    await chapterModel.findOneAndDelete({ _id: chapterId, courseId: courseId });
    res.status(200).json("chapter deleted");
  } catch (error) {
    return res.status(500).json({ msg: "delete chapter", error });
  }
};
export const getChaptersWithProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;

    // Get chapters for the course
    const chapters = await Chapter.find({ 
      courseId: courseId, 
      isPublished: true 
    }).sort({ position: 1 });

    // If userId is provided, include progress data
    if (userId) {
      const progressRecords = await StudentProgress.find({
        studentId: userId,
        courseId: courseId
      });

      // Create a map of progress by chapterId
      const progressMap = progressRecords.reduce((acc, record) => {
        acc[record.chapterId.toString()] = {
          isCompleted: record.completed,
          lastWatchedAt: record.lastWatchedAt
        };
        return acc;
      }, {});

      // Add progress to each chapter
      const chaptersWithProgress = chapters.map(chapter => ({
        ...chapter.toObject(),
        userProgress: progressMap[chapter._id.toString()] || null
      }));

      return res.json(chaptersWithProgress);
    }

    res.json(chapters);
  } catch (error) {
    console.error('Chapters with progress fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};
export const addChapterAttachment = async (req, res) => {
    console.log("add chapter attachment", req.body);

  try {
    const { chapterId } = req.params;
    const { url, userId } = req.body;
    const chapter = await chapterModel.findOne({ _id: chapterId, userId });
    if (!chapter) return res.status(404).json({ msg: "Chapter not found" });
    
    chapter.attachments.push(url);
    chapter.save();

    res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "add chapter attachment", error });
  }
};
export const deleteChapterAttachment = async (req, res) => {
  try {
    const {  chapterId, attachmentIdx } = req.params;

    const chapter = await chapterModel.findOne({ _id: chapterId });
    chapter.attachments = chapter.attachments.filter(
      (attachment, idx) => idx !== parseInt(attachmentIdx)
    );

    await chapter.save();

    res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "delete chapter attachment", error });
  }
};


export const addChapterAssignment = async (req, res) => {
  // console.log("add chapter assignment", req.body);
  try {
    const { chapterId } = req.params; 
    const { _id,title, description, dueDate, points, fileUrl } = req.body;

    const chapter = await chapterModel.findOne({ _id: chapterId });
    if (!chapter) return res.status(404).json({ msg: "Chapter not found" });
    const newAssignment = {
      _id: _id,
      title,
      description,
      dueDate,
      points,
      fileUrl
    };
    chapter.assignments.push(newAssignment);
    await chapter.save(); 
    res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "add chapter assignment", error });
  }
};


export const deleteChapterAssignment = async (req, res) => {
  try {
    const { chapterId, assignmentIdx } = req.params;

    const chapter = await chapterModel.findOne({ _id: chapterId });
    if (!chapter) return res.status(404).json({ msg: "Chapter not found" });  
    chapter.assignments = chapter.assignments.filter(
      (assignment, idx) => idx !== parseInt(assignmentIdx)
    );
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ msg: "delete chapter assignment", error });
  }
};