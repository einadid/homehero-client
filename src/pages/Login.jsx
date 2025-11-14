import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try { setLoading(true); await login(email, password); toast.success("Welcome back!"); navigate(from, { replace: true }); }
    catch (err) { toast.error(err.message || "Login failed"); }
    finally { setLoading(false); }
  };
  const onGoogle = async () => {
    try { await googleLogin(); toast.success("Logged in with Google"); navigate(from, { replace: true }); }
    catch (err) { toast.error(err.message || "Google login failed"); }
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className={`btn btn-primary w-full ${loading ? "loading" : ""}`} disabled={loading}>Login</button>
      </form>
      <button className="btn w-full mt-3" onClick={onGoogle}>Continue with Google</button>
      <p className="text-sm mt-3">No account? <Link className="link" to="/register">Register</Link></p>
    </div>
  );
}