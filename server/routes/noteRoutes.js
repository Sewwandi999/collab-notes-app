const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  addCollaborator,
  removeCollaborator
} = require("../controllers/noteController");

const router = express.Router();

router.use(authMiddleware);

router.get("/search", searchNotes);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/:id/add-collaborator", addCollaborator);
router.delete("/:id/remove-collaborator", removeCollaborator);

module.exports = router;