import { useContext, useState } from "react";
import api from "../lib/axios";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please login first");
    const payload = {
      ...form,
      price: Number(form.price),
      providerName: user.displayName || "Unknown",
      providerEmail: user.email
    };
    try {
      setLoading(true);
      await api.post("/services", payload);
      toast.success("Service added!");
      navigate("/my-services");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-4">Add Service</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input input-bordered w-full" name="name" placeholder="Service Name" onChange={onChange} required />
        <input className="input input-bordered w-full" name="category" placeholder="Category" onChange={onChange} required />
        <input className="input input-bordered w-full" name="price" type="number" min="0" placeholder="Price" onChange={onChange} required />
        <input className="input input-bordered w-full" name="image" placeholder="Image URL" onChange={onChange} required />
        <textarea className="textarea textarea-bordered w-full" name="description" placeholder="Description" onChange={onChange} required />
        <button className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>Save</button>
      </form>
    </div>
  );
}