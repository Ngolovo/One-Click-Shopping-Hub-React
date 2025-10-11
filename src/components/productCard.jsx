import React from "react";

const ProductCard = ({ product }) => {
  const whatsappUrl = `https://wa.me/${product.sellerPhone}?text=Hi, I'm interested in your ${product.name} listed on One Click Shopping Hub.`;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-amber-100 text-sm">{product.description}</p>
      <p className="font-bold text-blue-600 mt-2">Ksh {product.price}</p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-green-500 text-white rounded-md mt-3 py-2 hover:bg-green-600 transition"
      >
        Click to Purchase
      </a>
    </div>
  );
};

export default ProductCard;
