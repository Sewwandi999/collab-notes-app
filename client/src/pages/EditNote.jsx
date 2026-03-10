import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import CollaboratorList from "../components/CollaboratorList";
import { AuthContext } from "../context/AuthContext";
import {
  getNoteById,
  updateNote,
  addCollaborator,
  removeCollaborator,
} from "../services/noteService";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [owner, setOwner] = useState(null);
  const [email, setEmail] = useState("");

  const isOwner = useMemo(() => owner?._id === user?.id, [owner, user]);

  const loadNote = async () => {
    try {
      const data = await getNoteById(id);
      setTitle(data.title);
      setContent(data.content);
      setCollaborators(data.collaborators || []);
      setOwner(data.owner);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load note");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    loadNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateNote(id, { title, content });
      alert("Note updated successfully");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const handleAddCollaborator = async () => {
    try {
      const data = await addCollaborator(id, email);
      setCollaborators(data.collaborators || []);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add collaborator");
    }
  };

  const handleRemoveCollaborator = async (userId) => {
    try {
      const data = await removeCollaborator(id, userId);
      setCollaborators(data.collaborators || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove collaborator");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Edit Note
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Update your note</h1>
          </div>

          <input
            type="text"
            className="mb-5 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Editor value={content} setValue={setContent} />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleUpdate}
              className="rounded-2xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Update Note
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-2xl bg-slate-200 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-300"
            >
              Back
            </button>
          </div>
        </div>

        {isOwner && (
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Add Collaborator
            </h2>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="email"
                placeholder="Enter collaborator email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <button
                onClick={handleAddCollaborator}
                className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        )}

        <div className="mt-6">
          <CollaboratorList
            collaborators={collaborators}
            onRemove={handleRemoveCollaborator}
            isOwner={isOwner}
          />
        </div>
      </div>
    </div>
  );
}