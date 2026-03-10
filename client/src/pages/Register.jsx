import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const data = await registerUser({ name, email, password });
      login(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-emerald-50 to-cyan-100 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden bg-emerald-700 p-10 text-white md:block">
          <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-emerald-700">
            N
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight">
            Create your
            <br />
            note workspace.
          </h1>

          <p className="text-emerald-100">
            Register now and start writing, searching, and collaborating in one place.
          </p>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="mb-2 text-3xl font-bold text-slate-900">Create account</h2>
          <p className="mb-8 text-slate-500">Start using your collaborative notes app.</p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleRegister}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Register
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?
            <Link to="/" className="ml-1 font-semibold text-emerald-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}