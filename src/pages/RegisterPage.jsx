import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(userCredential.user, { displayName: form.username });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        mobile: form.mobile,
        email: form.email,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-bold mb-6">Register as a Seller</h1>
        <form
          onSubmit={handleRegister}
          className="bg-amber-800 p-8 rounded-lg shadow-md w-96 space-y-4"
        >
          {error && <p className="text-red-600">{error}</p>}
          {["firstName", "lastName", "username", "mobile", "email"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          ))}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
