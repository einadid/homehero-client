import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-1 container section">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}