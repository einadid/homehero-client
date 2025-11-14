import { useEffect, useMemo, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState({ search: "", minPrice: "", maxPrice: "", sort: "" });

  const params = useMemo(() => {
    const p = {};
    if (q.search) p.search = q.search;
    if (q.minPrice) p.minPrice = q.minPrice;
    if (q.maxPrice) p.maxPrice = q.maxPrice;
    if (q.sort) p.sort = q.sort;
    return p;
  }, [q]);

  useEffect(() => {
    setLoading(true);
    api.get("/services", { params })
      .then((res) => setServices(res.data.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Services</h1>
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <input className="input input-bordered" placeholder="Search by name/category" value={q.search} onChange={(e) => setQ((p) => ({ ...p, search: e.target.value }))} />
        <input className="input input-bordered" placeholder="Min Price" type="number" min="0" value={q.minPrice} onChange={(e) => setQ((p) => ({ ...p, minPrice: e.target.value }))} />
        <input className="input input-bordered" placeholder="Max Price" type="number" min="0" value={q.maxPrice} onChange={(e) => setQ((p) => ({ ...p, maxPrice: e.target.value }))} />
        <select className="select select-bordered" value={q.sort} onChange={(e) => setQ((p) => ({ ...p, sort: e.target.value }))}>
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="ratingDesc">Top Rated</option>
        </select>
      </div>
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-60 w-full" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => <ServiceCard key={s._id} s={s} />)}
          {services.length === 0 && <p className="text-sm opacity-70">No services found with these filters.</p>}
        </div>
      )}
    </div>
  );
}