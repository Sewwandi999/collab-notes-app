import { useState } from "react";

export default function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search notes by title or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Search
        </button>

        <button
          onClick={handleClear}
          className="rounded-xl bg-slate-200 px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
}