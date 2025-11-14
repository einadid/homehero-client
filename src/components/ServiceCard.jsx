import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function ServiceCard({ s }) {
  const { user } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);

  const addFav = async () => {
    if (!user) return toast.error("Login to save");

    try {
      setSaving(true);
      await api.post("/favorites", { serviceId: s._id });
      toast.success("Added to favorites");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-soft h-full">
      <figure className="aspect-[16/10] overflow-hidden relative">
        <img
          src={s.image}
          alt={s.name}
          className="w-full h-full object-cover hover:scale-105 transition"
          loading="lazy"
        />
        <button
          onClick={addFav}
          disabled={saving}
          className="btn btn-sm btn-circle absolute top-2 right-2 bg-base-100/90"
          title="Add to favorites"
        >
          ♡
        </button>
      </figure>

      <div className="card-body">
        <h3 className="card-title text-lg">{s.name}</h3>
        <p className="text-sm opacity-70">{s.category}</p>

        <div className="flex items-center justify-between">
          <span className="font-semibold">{s.price}</span>
          {s.ratingAvg != null && (
            <span className="text-sm">⭐ {s.ratingAvg}</span>
          )}
        </div>

        <div className="card-actions justify-end">
          <Link
            to={s.slug ? `/s/${s.slug}` : `/service/${s._id}`}
            className="btn btn-primary btn-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
