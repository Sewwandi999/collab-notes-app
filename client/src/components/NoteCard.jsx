import { Link } from "react-router-dom";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "");
}

export default function NoteCard({ note, onDelete }) {
  const preview = stripHtml(note.content).trim();

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
            {note.title}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Updated {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {note.collaborators?.length || 0} collaborators
        </div>
      </div>

      <p className="mb-5 min-h-[72px] text-sm leading-6 text-slate-600">
        {preview ? preview.slice(0, 140) : "No content yet."}
      </p>

      <div className="flex items-center gap-2">
        <Link
          to={`/edit-note/${note._id}`}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(note._id)}
          className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}