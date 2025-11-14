// src/pages/MyBookings.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!user?.email) return;
    setLoading(true);
    api
      .get("/bookings", { params: { userEmail: user.email } })
      .then((res) => setItems(res.data.items || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });
    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/bookings/${id}`, { params: { userEmail: user.email } });
      toast.success("Booking canceled");
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cancel failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Provider</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => {
              const svc = b.serviceId || {};
              const date = new Date(b.bookingDate).toLocaleDateString();
              return (
                <tr key={b._id}>
                  <td className="flex items-center gap-3">
                    {svc.image && (
                      <img
                        src={svc.image}
                        alt={svc.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{svc.name || "Service"}</div>
                      <div className="text-xs text-gray-500">#{b._id.slice(-6)}</div>
                    </div>
                  </td>
                  <td>{date}</td>
                  <td>${b.price}</td>
                  <td>
                    {svc.providerName}{" "}
                    <span className="text-xs text-gray-500">
                      ({svc.providerEmail})
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="btn btn-error btn-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-sm">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}