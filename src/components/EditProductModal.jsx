
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
      });
      setImageFile(null);
    }
  }, [product]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => setImageFile(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      // onSave should handle upload/deletion logic and update Firestore
      await onSave(form, imageFile);
      onClose();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save changes. See console for details.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Edit Product</h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short description"
                  className="w-full border rounded px-3 py-2 h-24"
                />
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border rounded px-3 py-2"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select category</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furnitures">Furnitures</option>
                  <option value="Others">Others</option>
                </select>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Replace image (optional)
                  </label>
                  <input type="file" accept="image/*" onChange={handleFile} />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded"
                    disabled={busy}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={busy}
                  >
                    {busy ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;
