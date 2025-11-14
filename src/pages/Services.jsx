import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../lib/axios";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
const [services, setServices] = useState([]);
const [loading, setLoading] = useState(true);
const [total, setTotal] = useState(0);
const [pages, setPages] = useState(1);
const [searchParams, setSearchParams] = useSearchParams();

const [q, setQ] = useState({
search: searchParams.get("search") || "",
minPrice: searchParams.get("minPrice") || "",
maxPrice: searchParams.get("maxPrice") || "",
sort: searchParams.get("sort") || "",
page: Number(searchParams.get("page") || 1),
limit: 9
});

const params = useMemo(() => {
const p = { page: q.page, limit: q.limit };
if (q.search) p.search = q.search;
if (q.minPrice) p.minPrice = q.minPrice;
if (q.maxPrice) p.maxPrice = q.maxPrice;
if (q.sort) p.sort = q.sort;
return p;
}, [q]);

useEffect(() => {
const sp = new URLSearchParams();
Object.entries(params).forEach(([k, v]) => v && sp.set(k, String(v)));
setSearchParams(sp, { replace: true });

setLoading(true);
api.get("/services", { params })
  .then((res) => {
    setServices(res.data.items || []);
    setTotal(res.data.total || 0);
    setPages(res.data.pages || 1);
  })
  .catch((err) => console.error(err))
  .finally(() => setLoading(false));

  }, [params, setSearchParams]);

const next = () => setQ((p) => ({ ...p, page: Math.min(p.page + 1, pages) }));
const prev = () => setQ((p) => ({ ...p, page: Math.max(p.page - 1, 1) }));
const resetFilters = () => setQ((_) => ({ search: "", minPrice: "", maxPrice: "", sort: "", page: 1, limit: 9 }));

return (
<div>
<h1 className="text-2xl font-bold mb-4">All Services</h1>

  <div className="flex items-center justify-between mb-2">
    <button className="btn btn-sm" onClick={resetFilters}>Clear</button>
    <div className="text-sm opacity-70">Total: {total}</div>
  </div>

  <div className="grid md:grid-cols-5 gap-3 mb-4">
    <input className="input input-bordered" placeholder="Search by name/category" value={q.search} onChange={(e) => setQ((p) => ({ ...p, search: e.target.value, page: 1 }))} />
    <input className="input input-bordered" placeholder="Min Price" type="number" min="0" value={q.minPrice} onChange={(e) => setQ((p) => ({ ...p, minPrice: e.target.value, page: 1 }))} />
    <input className="input input-bordered" placeholder="Max Price" type="number" min="0" value={q.maxPrice} onChange={(e) => setQ((p) => ({ ...p, maxPrice: e.target.value, page: 1 }))} />
    <select className="select select-bordered" value={q.sort} onChange={(e) => setQ((p) => ({ ...p, sort: e.target.value, page: 1 }))}>
      <option value="">Sort by</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="ratingDesc">Top Rated</option>
      <option value="createdDesc">Newest</option>
    </select>
    <select className="select select-bordered" value={q.limit} onChange={(e) => setQ((p) => ({ ...p, limit: Number(e.target.value), page: 1 }))}>
      <option value={9}>9 / page</option>
      <option value={12}>12 / page</option>
      <option value={15}>15 / page</option>
    </select>
  </div>

  {loading ? (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(q.limit)].map((_, i) => <div key={i} className="skeleton h-60 w-full" />)}
    </div>
  ) : (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => <ServiceCard key={s._id} s={s} />)}
        {services.length === 0 && <p className="text-sm opacity-70">No services found.</p>}
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button className="btn" onClick={prev} disabled={q.page <= 1}>Prev</button>
        <span className="text-sm">Page {q.page} of {pages}</span>
        <button className="btn" onClick={next} disabled={q.page >= pages}>Next</button>
      </div>
    </>
  )}
</div>
);
}