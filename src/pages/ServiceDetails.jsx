// src/pages/ServiceDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import { AuthContext } from "../context/AuthProvider";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [s, setS] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/${id}`)
      .then((res) => setS(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;
  if (!s) return <div>Not found</div>;

  const isOwn = user?.email && user.email === s.providerEmail;

  return (
    <div className="max-w-3xl mx-auto">
      <img src={s.image} alt={s.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{s.name}</h1>
      <p className="text-gray-500">{s.category}</p>
      <p className="text-xl font-semibold my-2">${s.price}</p>
      <p className="mb-4">{s.description}</p>
      <p className="text-sm">Provider: {s.providerName} ({s.providerEmail})</p>
      <div className="mt-4">
        <button className="btn btn-primary" disabled={isOwn}>Book Now</button>
        {isOwn && <p className="text-sm text-warning mt-2">You cannot book your own service.</p>}
      </div>
    </div>
  );
}