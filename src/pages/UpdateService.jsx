import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

export default function UpdateService() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/${id}`)
      .then((res) => {
        const s = res.data;
        setForm({ name: s.name, category: s.category, price: s.price, description: s.description, image: s.image });
      })
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/services/${id}`, { ...form, price: Number(form.price), providerEmail: user.email });
      toast.success("Updated");
      navigate("/my-services");
    } catch (err) { toast.error(err?.response?.data?.message || "Update failed"); }
  };

  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-4">Update Service</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input input-bordered w-full" name="name" value={form.name} onChange={onChange} required />
        <input className="input input-bordered w-full" name="category" value={form.category} onChange={onChange} required />
        <input className="input input-bordered w-full" name="price" type="number" min="0" value={form.price} onChange={onChange} required />
        <input className="input input-bordered w-full" name="image" value={form.image} onChange={onChange} required />
        <textarea className="textarea textarea-bordered w-full" name="description" value={form.description} onChange={onChange} required />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}