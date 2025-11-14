import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { register, updateUser, googleLogin } = useContext(AuthContext);
  const [name, setName] = useState(""); const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validPassword = (p) => p.length >= 6 && /[a-z]/.test(p) && /[A-Z]/.test(p);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validPassword(password)) return toast.error("Password must be 6+ chars with upper & lower case");
    try {
      setLoading(true);
      await register(email, password);
      await updateUser(name, photo);
      toast.success("Registered!");
      navigate("/");
    } catch (err) { toast.error(err.message || "Register failed"); }
    finally { setLoading(false); }
  };

  const onGoogle = async () => {
    try { await googleLogin(); toast.success("Logged in with Google"); navigate("/"); }
    catch (err) { toast.error(err.message || "Google login failed"); }
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className={`btn btn-primary w-full ${loading ? "loading" : ""}`} disabled={loading}>Create account</button>
      </form>
      <button className="btn w-full mt-3" onClick={onGoogle}>Continue with Google</button>
      <p className="text-sm mt-3">Already have an account? <Link className="link" to="/login">Login</Link></p>
    </div>
  );
}