import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import { getNotes, searchNotes, deleteNote } from "../services/noteService";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      alert("Failed to load notes");
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      loadNotes();
      return;
    }

    try {
      const data = await searchNotes(query);
      setNotes(data);
    } catch (error) {
      alert("Search failed");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
          <p className="mb-2 text-sm uppercase tracking-widest text-blue-100">
            Dashboard
          </p>
          <h1 className="text-4xl font-bold">My Notes</h1>
          <p className="mt-2 max-w-2xl text-blue-100">
            Manage your personal and shared notes, search instantly, and collaborate with others.
          </p>

          <button
            onClick={() => navigate("/create-note")}
            className="mt-6 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            + Create New Note
          </button>
        </div>

        <SearchBar onSearch={handleSearch} onClear={loadNotes} />

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">No notes yet</h2>
            <p className="mt-2 text-slate-500">
              Create your first note to get started.
            </p>
            <button
              onClick={() => navigate("/create-note")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}