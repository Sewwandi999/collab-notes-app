import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
            N
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">NoteFlow</p>
            <p className="text-xs text-slate-500">Collaborative notes</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700 md:block">
            {user?.name || "User"}
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}