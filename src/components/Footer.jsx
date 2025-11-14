export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container py-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-between text-sm">
        <div>
          <div className="font-display text-lg">HomeHero</div>
          <p className="opacity-70">Find and book trusted local services.</p>
        </div>
        <div className="flex gap-4 items-center">
          <a href="#" aria-label="X (Twitter)" className="hover:opacity-80">𝕏</a>
          <a href="#" aria-label="Facebook" className="hover:opacity-80">Fb</a>
          <a href="#" aria-label="Contact" className="hover:opacity-80">Contact</a>
        </div>
        <div className="opacity-70">© {new Date().getFullYear()} HomeHero</div>
      </div>
    </footer>
  );
}