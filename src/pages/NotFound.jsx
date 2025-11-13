import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}