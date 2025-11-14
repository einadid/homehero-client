import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="section-title mb-2">Documentation</h1>
      <p className="opacity-70 mb-6">Everything you need to use HomeHero as a customer or provider.</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <a href="#getting-started" className="btn">Getting Started</a>
        <a href="#bookings" className="btn">Bookings</a>
        <a href="#providers" className="btn">Providers</a>
        <a href="#payments" className="btn">Payments & Refunds</a>
        <a href="#safety" className="btn">Safety & Trust</a>
        <Link to="/contact" className="btn">Contact Support</Link>
      </div>

      <section id="getting-started" className="mb-10">
        <h2 className="text-xl font-bold mb-2">Getting Started</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm opacity-90">
          <li>Register/Login using email or Google</li>
          <li>Browse Services → filter by price/rating</li>
          <li>Open Details → Book Now → select date → confirm</li>
        </ol>
      </section>

      <section id="bookings" className="mb-10">
        <h2 className="text-xl font-bold mb-2">Bookings</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
          <li>All your bookings appear at My Bookings</li>
          <li>Cancel if necessary (before service time)</li>
          <li>Only booked users can leave a review</li>
        </ul>
      </section>

      <section id="providers" className="mb-10">
        <h2 className="text-xl font-bold mb-2">For Providers</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
          <li>Add Service with clear title, image, price</li>
          <li>Manage/Edit/Delete from My Services</li>
          <li>Check stats from your Profile (bookings, revenue, rating)</li>
        </ul>
      </section>

      <section id="payments" className="mb-10">
        <h2 className="text-xl font-bold mb-2">Payments & Refunds</h2>
        <p className="text-sm opacity-90">Payments are handled offline (or via provider’s policy). For disputes, contact support with booking ID.</p>
      </section>

      <section id="safety" className="mb-10">
        <h2 className="text-xl font-bold mb-2">Safety & Trust</h2>
        <p className="text-sm opacity-90">We prioritize your safety. Check ratings & reviews before booking. Report suspicious activity to support.</p>
      </section>

      <div className="flex gap-3">
        <Link to="/terms" className="link">Terms</Link>
        <Link to="/privacy" className="link">Privacy</Link>
        <Link to="/contact" className="link">Contact</Link>
      </div>
    </div>
  );
}