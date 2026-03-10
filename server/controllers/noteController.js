const Note = require("../models/Note");
const User = require("../models/User");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    })
      .populate("owner", "name email")
      .populate("collaborators", "name email")
      .sort({ updatedAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate("owner", "name email")
      .populate("collaborators", "name email");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const hasAccess =
      note.owner._id.toString() === req.user.id ||
      note.collaborators.some((user) => user._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.create({
      title,
      content,
      owner: req.user.id,
      collaborators: []
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const hasAccess =
      note.owner.toString() === req.user.id ||
      note.collaborators.some((id) => id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    note.title = req.body.title ?? note.title;
    note.content = req.body.content ?? note.content;

    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can delete this note" });
    }

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const notes = await Note.find({
      $and: [
        { $text: { $search: q } },
        {
          $or: [
            { owner: req.user.id },
            { collaborators: req.user.id }
          ]
        }
      ]
    })
      .populate("owner", "name email")
      .populate("collaborators", "name email");

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCollaborator = async (req, res) => {
  try {
    const { email } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add collaborators" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyExists = note.collaborators.some(
      (id) => id.toString() === user._id.toString()
    );

    if (!alreadyExists) {
      note.collaborators.push(user._id);
      await note.save();
    }

    const updatedNote = await Note.findById(note._id)
      .populate("owner", "name email")
      .populate("collaborators", "name email");

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeCollaborator = async (req, res) => {
  try {
    const { userId } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can remove collaborators" });
    }

    note.collaborators = note.collaborators.filter(
      (id) => id.toString() !== userId
    );

    await note.save();

    const updatedNote = await Note.findById(note._id)
      .populate("owner", "name email")
      .populate("collaborators", "name email");

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};