import { User } from "lucide-react";
import React from "react";

const ProductCard = ({ product }) => {
  const whatsappUrl = `https://wa.me/${User.mobile}?text=Hi, I'm interested in your ${product.name} listed on One Click Shopping Hub.`;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover rounded-md mb-3"
      />
      <h3 className="text-amber-900 text-lg font-semibold">{product.name}</h3>
      <p className="text-black text-sm">{product.description}</p>
      <p className="font-bold text-orange-600 mt-2">Ksh {product.price}</p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-amber-950 text-fuchsia-800 rounded-md mt-3 py-2 hover:bg-amber-800 transition"
      >
        Buy
      </a>
    </div>
  );
};

export default ProductCard;
