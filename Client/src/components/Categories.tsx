import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

export default function VintageCategories() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: 1,
      name: "Vintage Jackets",
      image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef",
      description: "Classic leather and denim pieces from the past decades",
    },
    {
      id: 2,
      name: "Retro Dresses",
      image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b",
      description: "Elegant vintage dresses from the 50s to 80s",
    },
    {
      id: 3,
      name: "Classic Denim",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      description: "Timeless denim pieces with authentic wear",
    },
    {
      id: 4,
      name: "Vintage Sportswear",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      description: "Authentic athletic wear from renowned brands",
    },
    {
      id: 5,
      name: "Rare Collectibles",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      description: "One-of-a-kind vintage pieces for collectors",
    },
    {
      id: 6,
      name: "Vintage Accessories",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
      description: "Complete your look with classic accessories",
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transform transition-transform duration-300">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
