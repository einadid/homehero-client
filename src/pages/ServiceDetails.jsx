// src/pages/ServiceDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [s, setS] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setLoading(true);
    api.get(`/services/${id}`)
      .then((res) => setS(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;
  if (!s) return <div>Not found</div>;

  const isOwn = user?.email && user.email === s.providerEmail;

  const handleOpen = () => {
    if (!user) return navigate("/login", { state: { from: `/service/${id}` } });
    if (isOwn) return toast.error("নিজের সার্ভিস বুক করা যাবে না");
    setOpen(true);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!bookingDate) return toast.error("তারিখ সিলেক্ট করুন");
    try {
      await api.post("/bookings", {
        userEmail: user.email,
        serviceId: s._id,
        bookingDate,
        price: s.price,
      });
      toast.success("Booking confirmed!");
      setOpen(false);
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <img src={s.image} alt={s.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{s.name}</h1>
      <p className="text-gray-500">{s.category}</p>
      <p className="text-xl font-semibold my-2">${s.price}</p>
      <p className="mb-4">{s.description}</p>
      <p className="text-sm">Provider: {s.providerName} ({s.providerEmail})</p>

      <div className="mt-4">
        <button className="btn btn-primary" disabled={isOwn} onClick={handleOpen}>Book Now</button>
        {isOwn && <p className="text-sm text-warning mt-2">You cannot book your own service.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Confirm Booking</h3>
            <p className="mb-4">{s.name} — ${s.price}</p>

            <form onSubmit={handleBook} className="space-y-3">
              <div>
                <label className="label">Your Email</label>
                <input className="input input-bordered w-full" value={user?.email || ""} readOnly />
              </div>
              <div>
                <label className="label">Booking Date</label>
                <input className="input input-bordered w-full" type="date" min={today} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="btn" onClick={() => setOpen(false)}>Close</button>
                <button type="submit" className="btn btn-primary">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}