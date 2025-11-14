import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
const [latest, setLatest] = useState([]);
const [top, setTop] = useState([]);
const [loading, setLoading] = useState(true);
const [trending, setTrending] = useState([]);

useEffect(() => {
Promise.all([
api.get("/services", { params: { limit: 6, sort: "createdDesc" } }).catch(() => ({ data: { items: [] } })),
api.get("/services", { params: { limit: 6, sort: "ratingDesc" } }).catch(() => ({ data: { items: [] } })),
api.get("/trending", { params: { limit: 6 } }).catch(() => ({ data: { items: [] } }))
]).then(([l, t, tr]) => {
setLatest(l.data.items || []);
setTop(t.data.items || []);
setTrending(tr.data.items || []);
}).finally(() => setLoading(false));
}, []);

const Grid = ({ items }) => (
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{items.map((s) => <ServiceCard key={s._id} s={s} />)}
</div>
);

const Skeletons = () => (
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-60 w-full" />)}
</div>
);

return (
<>
<Hero />
<section className="section">
<div className="container">
<div className="flex items-center justify-between mb-4">
<h3 className="section-title">Latest Services</h3>
<Link className="btn btn-sm" to="/services">View all</Link>
</div>
{loading ? <Skeletons /> : <Grid items={latest} />}
</div>
</section>
<section className="section bg-base-200">
<div className="container">
<div className="flex items-center justify-between mb-4">
<h3 className="section-title">Top Rated</h3>
<Link className="btn btn-sm" to="/services">Explore</Link>
</div>
{loading ? <Skeletons /> : <Grid items={top} />}
</div>
</section>
<section className="section">
<div className="container">
<h3 className="section-title mb-4">Trending Now</h3>
{loading ? <Skeletons /> : <Grid items={trending} />}
</div>
</section>
<section className="section">
<div className="container grid md:grid-cols-2 gap-6">
<div className="p-6 rounded bg-base-200">
<h4 className="text-xl font-bold mb-2">Why Choose HomeHero</h4>
<ul className="list-disc pl-5 space-y-1 text-sm">
<li>Verified providers with ratings</li>
<li>Secure booking and instant alerts</li>
<li>Transparent pricing and reviews</li>
</ul>
</div>
<div className="p-6 rounded bg-base-200">
<h4 className="text-xl font-bold mb-2">What customers say</h4>
<p className="text-sm">“Fast, reliable, and super easy to book. Highly recommended!”</p>
</div>
</div>
</section>
</>
);
}