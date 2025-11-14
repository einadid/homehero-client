import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-display text-lg">HomeHero</div>
          <p className="opacity-70">Local Pros. On Demand.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1">
            <li><Link to="/docs" className="link">Docs</Link></li>
            <li><Link to="/terms" className="link">Terms</Link></li>
            <li><Link to="/privacy" className="link">Privacy</Link></li>
            <li><Link to="/contact" className="link">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Social</div>
          <div className="flex gap-4 items-center">
            <a href="#" aria-label="X (Twitter)">𝕏</a>
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Contact">Email</a>
          </div>
        </div>
        <div className="md:col-span-3 opacity-70">© {new Date().getFullYear()} HomeHero</div>
      </div>
    </footer>
  );
}