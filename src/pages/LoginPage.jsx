import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/seller");
    } catch (err) {
      setError("Invalid credentials or user not found");
    }
  };

  return (
    <>
      <Navbar  />
      <div className=" flex-grow place-items-center justify-center min-w-screen py-10 mt-0">
        <h1 className="text-3xl font-bold mb-6">Seller Login</h1>
        <form
          onSubmit={handleLogin}
          className="bg-amber-800 p-8 rounded-lg shadow-md w-96 space-y-4"
        >
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
