import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import StarRating from "../components/StarRating";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const load = () => {
    if (!user?.email) return;
    setLoading(true);
    api.get("/bookings", { params: { userEmail: user.email } })
      .then((res) => setItems(res.data.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [user?.email]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({ title: "Cancel this booking?", icon: "warning", showCancelButton: true, confirmButtonText: "Yes, cancel" });
    if (!confirm.isConfirmed) return;
    try {
      await api.delete(`/bookings/${id}`, { params: { userEmail: user.email } });
      toast.success("Booking canceled");
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (err) { toast.error(err?.response?.data?.message || "Cancel failed"); }
  };

  const openReview = (svc) => {
    setReviewTarget(svc?._id);
    setRating(0);
    setComment("");
    setReviewOpen(true);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please select rating");
    try {
      await api.post(`/services/${reviewTarget}/reviews`, { userEmail: user.email, rating, comment });
      toast.success("Review submitted!");
      setReviewOpen(false);
    } catch (err) { toast.error(err?.response?.data?.message || "Failed to submit review"); }
  };

  if (loading) return <div className="min-h-[40vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr><th>Service</th><th>Date</th><th>Price</th><th>Provider</th><th>Action</th></tr></thead>
          <tbody>
            {items.map((b) => {
              const svc = b.serviceId || {};
              const date = new Date(b.bookingDate).toLocaleDateString();
              return (
                <tr key={b._id}>
                  <td className="flex items-center gap-3">
                    {svc.image && <img src={svc.image} alt={svc.name} className="w-12 h-12 object-cover rounded" />}
                    <div>
                      <div className="font-semibold">{svc.name || "Service"}</div>
                      <div className="text-xs text-gray-500">#{b._id.slice(-6)}</div>
                    </div>
                  </td>
                  <td>{date}</td>
                  <td>${b.price}</td>
                  <td>{svc.providerName} <span className="text-xs text-gray-500">({svc.providerEmail})</span></td>
                  <td className="flex gap-2">
                    <button onClick={() => openReview(svc)} className="btn btn-sm">Review</button>
                    <button onClick={() => handleCancel(b._id)} className="btn btn-error btn-sm">Cancel</button>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && <tr><td colSpan="5" className="text-center text-sm">No bookings yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {reviewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Add a Review</h3>
            <form onSubmit={submitReview} className="space-y-3">
              <div>
                <label className="label">Your Email</label>
                <input className="input input-bordered w-full" value={user?.email || ""} readOnly />
              </div>
              <div className="flex items-center gap-3">
                <span>Rating:</span>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <textarea className="textarea textarea-bordered w-full" placeholder="Comment (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
              <div className="flex justify-end gap-2">
                <button type="button" className="btn" onClick={() => setReviewOpen(false)}>Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}