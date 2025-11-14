import { Link } from "react-router-dom";

export default function ServiceCard({ s }) {
  return (
    <div className="card bg-base-100 shadow-soft h-full">
      <figure className="aspect-[16/10] overflow-hidden">
        <img src={s.image} alt={s.name} className="w-full h-full object-cover hover:scale-105 transition" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg">{s.name}</h3>
        <p className="text-sm opacity-70">{s.category}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">${s.price}</span>
          {s.ratingAvg != null && <span className="text-sm">⭐ {s.ratingAvg}</span>}
        </div>
        <div className="card-actions justify-end">
          <Link to={`/service/${s._id}`} className="btn btn-primary btn-sm">Details</Link>
        </div>
      </div>
    </div>
  );
}