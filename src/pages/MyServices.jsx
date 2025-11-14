import { useContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyServices() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!user?.email) return;
    setLoading(true);
    api.get("/services", { params: { providerEmail: user.email } })
      .then((res) => setItems(res.data.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: "Delete this service?", icon: "warning", showCancelButton: true, confirmButtonText: "Yes, delete" });
    if (!confirm.isConfirmed) return;
    try {
      await api.delete(`/services/${id}`, { params: { providerEmail: user.email } });
      toast.success("Deleted");
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (err) { toast.error(err?.response?.data?.message || "Delete failed"); }
  };

  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Services</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>${s.price}</td>
                <td className="flex gap-2">
                  <Link to={`/update/${s._id}`} className="btn btn-sm">Edit</Link>
                  <button onClick={() => handleDelete(s._id)} className="btn btn-error btn-sm">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan="4" className="text-center text-sm">No services yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}