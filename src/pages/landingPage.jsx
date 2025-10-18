import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProductCard from "../components/productCard"
import Loader from "../components/Loader";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { categories } from "../utils/categories";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
    <div className=" flex justify-between items-center flex-col">
      <Navbar />
      <main className="flex-grow px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Welcome to One Click Shopping Hub
        </h1>

        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.filter(p => p.category === cat).length > 0 ? (
                products
                  .filter((p) => p.category === cat)
                  .map((p) => <ProductCard key={p.id} product={p} />)
              ) : (
                <p className="text-gray-500">No {cat} products yet.</p>
              )}
            </div>
          </div>
        ))}
      </main>
      
    </div>
    <Footer />
    </>
  );
};

export default LandingPage;
