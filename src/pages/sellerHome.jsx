import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";
import EditProductModal from "../components/EditProductModal";
import { auth, db, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard";

const SellerHome = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [toDelete, setToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/login");
        return;
      }
      setUser(u);

      // listen to products by this seller
      const q = query(collection(db, "products"), where("sellerId", "==", u.uid));
      const unsub = onSnapshot(q, (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProducts(items);
        setLoading(false);
      });

      // cleanup when auth changes
      return () => unsub();
    });

    return () => unsubAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDelete = (product) => {
    setToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      // delete Firestore doc
      await deleteDoc(doc(db, "products", toDelete.id));
      // delete image from storage if exists
      if (toDelete.imagePath) {
        const imgRef = ref(storage, toDelete.imagePath);
        try {
          await deleteObject(imgRef);
        } catch (err) {
          // ignore or log - image may already be missing
          console.warn("Failed to delete image:", err);
        }
      }
      setIsConfirmOpen(false);
      setToDelete(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete product. See console.");
    }
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  // onSave handler passed to EditProductModal
  const handleSaveEdit = async (formValues, imageFile) => {
    if (!editingProduct) return;
    const prodRef = doc(db, "products", editingProduct.id);

    // If user provided new image -> upload, delete old image
    let newImageUrl = null;
    let newImagePath = null;

    if (imageFile) {
      // upload new image
      const path = `products/${user.uid}/${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, imageFile);
      newImageUrl = await getDownloadURL(storageRef);
      newImagePath = path;

      // delete old image if present
      if (editingProduct.imagePath) {
        try {
          await deleteObject(ref(storage, editingProduct.imagePath));
        } catch (err) {
          console.warn("Could not delete old image:", err);
        }
      }
    }

    // prepare update payload
    const payload = {
      name: formValues.name || editingProduct.name,
      description: formValues.description || editingProduct.description,
      category: formValues.category || editingProduct.category,
      price: formValues.price || editingProduct.price,
      updatedAt: new Date(),
    };
    if (newImageUrl) {
      payload.imageUrl = newImageUrl;
      payload.imagePath = newImagePath;
    }

    await updateDoc(prodRef, payload);

    // optimistically update local state (onSnapshot will also update)
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? { ...p, ...payload } : p))
    );
    setIsEditOpen(false);
    setEditingProduct(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">My Products</h1>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-600">You have not posted any products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow p-4">
                <ProductCard product={p} />
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => openEdit(p)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDelete(p)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Confirm deletion modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setToDelete(null);
        }}
        onConfirm={handleDelete}
        productName={toDelete ? toDelete.name || toDelete.title || toDelete.description : ""}
      />

      {/* Edit product modal */}
      <EditProductModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default SellerHome;
