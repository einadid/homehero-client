import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="bg-base-100 border-b">
      <div className="navbar container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="font-bold text-xl">HomeHero</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal gap-2">
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
              <li><button onClick={logout}>Logout</button></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}