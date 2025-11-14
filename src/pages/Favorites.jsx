import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/favorites")
      .then((res) => setItems(res.data.items || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const removeFav = async (favId) => {
    try {
      await api.delete(`/favorites/${favId}`);
      setItems((prev) => prev.filter((x) => x._id !== favId));
      toast.success("Removed from favorites");
    } catch (e) {
      console.error(e);
      toast.error("Failed to remove favorite");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((f) => {
          const s = f.serviceId || {};
          return (
            <div key={f._id} className="card bg-base-100 shadow-soft h-full">
              <figure className="aspect-[16/10] overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">{s.name}</h3>
                <p className="text-sm opacity-70">{s.category}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${s.price}</span>
                  <span className="text-sm">⭐ {s.ratingAvg || 0}</span>
                </div>
                <div className="card-actions justify-between mt-2">
                  <Link
                    to={s.slug ? `/s/${s.slug}/service/${s._id}` : `/service/${s._id}`}
                    className="btn btn-sm"
                  >
                    Details
                  </Link>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => removeFav(f._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-sm opacity-70 col-span-full">No favorites yet.</p>
        )}
      </div>
    </div>
  );
}
