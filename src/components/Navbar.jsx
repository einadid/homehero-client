import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-service">Add Service</NavLink></li>
          <li><NavLink to="/my-services">My Services</NavLink></li>
          <li><NavLink to="/my-bookings">My Bookings</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
        </>
      )}
      {!user ? (
        <>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </>
      ) : (
        <li><button onClick={logout} className="btn btn-sm">Logout</button></li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b">
      <div className="navbar container">
        <div className="flex-1">
          <Link to="/" className="font-display text-xl md:text-2xl">HomeHero</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="btn btn-ghost btn-sm" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-base-100">
          <ul className="menu p-2">{links}</ul>
        </div>
      )}
    </div>
  );
}