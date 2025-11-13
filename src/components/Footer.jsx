export default function Footer() {
  return (
    <footer className="bg-base-200 mt-10">
      <div className="container mx-auto px-4 py-6 text-sm flex flex-col md:flex-row justify-between">
        <p>© {new Date().getFullYear()} HomeHero. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" aria-label="X (Twitter)">𝕏</a>
          <a href="#" aria-label="Facebook">Fb</a>
          <a href="#" aria-label="Contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}