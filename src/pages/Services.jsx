// src/pages/Services.jsx
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/services")
      .then((res) => setServices(res.data.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-60 w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Services</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s._id} className="card bg-base-100 shadow-md h-full">
            <figure className="h-40 overflow-hidden">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{s.name}</h2>
              <p className="text-sm text-gray-500">{s.category}</p>
              <p className="font-semibold">${s.price}</p>
              <div className="card-actions justify-end">
                <Link to={`/service/${s._id}`} className="btn btn-primary btn-sm">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}