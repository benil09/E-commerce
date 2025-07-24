import React from 'react';
import img from "../assets/react.svg"
 
const HomePage = () => {
  return (
    <div className="p-8 mt-14">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Store</h1>
        <p className="text-gray-600 mt-2">Discover the best products at unbeatable prices.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <div key={id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <img
              src={img}
              alt={`Product ${id}`}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800">Product {id}</h2>
            <p className="text-gray-600 text-sm mt-1 mb-2">This is a great product that you'll love.</p>
            <span className="text-green-600 font-bold">$29.99</span>
            <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
