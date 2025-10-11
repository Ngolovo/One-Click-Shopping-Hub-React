import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { categories } from "../utils/categories";

const AddProductPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: categories[0] || "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/login");
        return;
      }
      setUser(u);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleFile = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }
    setSubmitting(true);

    try {
      // get seller phone from users collection (if present)
      let sellerPhone = "";
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          sellerPhone = userDoc.data().mobile || userDoc.data().phone || "";
        }
      } catch (err) {
        console.warn("Could not read seller profile:", err);
      }

      // upload image
      const path = `products/${user.uid}/${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // create product doc
      await addDoc(collection(db, "products"), {
        name: form.name,
        description: form.description,
        category: form.category,
        price: form.price,
        imageUrl,
        imagePath: path,
        sellerId: user.uid,
        sellerPhone, // used for whatsapp link
        createdAt: serverTimestamp(),
      });

      alert("Product posted successfully!");
      navigate("/seller");
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Failed to post product. See console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-grow max-w-3xl mx-auto px-4 py-10">
        <div className="bg-cyan-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full border px-3 py-2 rounded h-28"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border px-3 py-2 rounded"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div>
              <label className="block mb-2 text-sm text-shadow-gray-400">Product image</label>
              <input type="file" accept="image/*" onChange={handleFile} required />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
              >
                {submitting ? "Posting..." : "Post Product"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddProductPage;
