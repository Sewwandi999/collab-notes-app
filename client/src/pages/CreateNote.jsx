import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import { createNote } from "../services/noteService";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await createNote({ title, content });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              New Note
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Create Note</h1>
          </div>

          <input
            type="text"
            placeholder="Enter note title"
            className="mb-5 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Editor value={content} setValue={setContent} />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Save Note
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-2xl bg-slate-200 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}