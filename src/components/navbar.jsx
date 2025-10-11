import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full justify-center min-w-screen bg-orange-400 text-white px-9 py-8 mt-0">
      <Link to="/" className="text-4xl font-bold">One Click Shopping Hub</Link>
      <div className="flex space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/seller" className="hover:underline">My Products</Link>
            <Link to="/add-product" className="hover:underline">Add Product</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
