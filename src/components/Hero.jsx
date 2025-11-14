import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
return (
<section className="section">
<div className="container grid md:grid-cols-2 gap-8 items-center">
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
<h1 className="text-3xl md:text-5xl font-bold leading-tight">Book trusted local pros near you</h1>
<p className="text-base md:text-lg opacity-80">Electricians, plumbers, cleaners—compare ratings and book in minutes.</p>
<div className="flex gap-3">
<Link to="/services" className="btn btn-primary">Explore Services</Link>
<Link to="/profile" className="btn">Your Profile</Link>
</div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-soft">
<img src="https://images.unsplash.com/photo-1523419409543-a5e549c1a8b4?q=80&w=1200&auto=format&fit=crop" alt="Home services" className="w-full h-[280px] md:h-[360px] object-cover" />
</motion.div>
</div>
</section>
);
}