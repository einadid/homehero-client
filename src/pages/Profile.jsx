import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import api from "../lib/axios";

export default function Profile() {
const { user } = useContext(AuthContext);
const [name, setName] = useState(user?.displayName || "");
const [photo, setPhoto] = useState(user?.photoURL || "");
const [stats, setStats] = useState(null);

useEffect(() => {
if (user?.email) {
api.get("/provider/summary", { params: { email: user.email } })
.then((res) => setStats(res.data))
.catch(() => {});
}
}, [user?.email]);

const onSave = async () => {
try {
await updateProfile(user, { displayName: name, photoURL: photo });
toast.success("Profile updated");
} catch { toast.error("Update failed"); }
};

const lastLogin = user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : "";

return (
<div className="grid md:grid-cols-2 gap-6">
<div className="card bg-base-100 shadow-soft p-6">
<h2 className="text-2xl font-bold mb-4">Your Profile</h2>
<div className="flex items-center gap-4">
<img src={photo || "https://i.pravatar.cc/100"} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
<div className="flex-1">
<input className="input input-bordered w-full mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
<input className="input input-bordered w-full" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} />
</div>
</div>
<div className="mt-4 space-y-1 text-sm">
<p>Email: {user?.email}</p>
<p>Last login: {lastLogin}</p>
</div>
<button className="btn btn-primary mt-4" onClick={onSave}>Save</button>
</div>

  <div className="card bg-base-100 shadow-soft p-6">
    <h2 className="text-2xl font-bold mb-4">Provider Stats</h2>
    {!stats ? (
      <div className="skeleton h-40 w-full"></div>
    ) : (
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded bg-base-200">
          <div className="text-2xl font-bold">{stats.totalServices}</div>
          <div className="text-sm opacity-70">Services</div>
        </div>
        <div className="p-4 rounded bg-base-200">
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <div className="text-sm opacity-70">Bookings</div>
        </div>
        <div className="p-4 rounded bg-base-200 col-span-2">
          <div className="text-2xl font-bold">${stats.totalRevenue}</div>
          <div className="text-sm opacity-70">Total Revenue</div>
        </div>
        <div className="p-4 rounded bg-base-200 col-span-2">
          <div className="text-2xl font-bold">⭐ {stats.avgRating}</div>
          <div className="text-sm opacity-70">Average Rating</div>
        </div>
      </div>
    )}
  </div>
</div>
);
}