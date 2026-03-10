import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });
      login(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden bg-slate-900 p-10 text-white md:block">
          <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold">
            N
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight">
            Organize ideas.
            <br />
            Collaborate faster.
          </h1>

          <p className="text-slate-300">
            A modern note-taking workspace with search, rich text editing, and
            collaborator management.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              Full-text search across all your notes
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              Share notes with collaborators easily
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              Beautiful editor and responsive dashboard
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="mb-2 text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="mb-8 text-slate-500">Login to continue to your workspace.</p>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?
            <Link to="/register" className="ml-1 font-semibold text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}