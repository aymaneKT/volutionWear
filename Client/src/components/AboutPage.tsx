import { useState } from "react";
import { Link } from "react-router-dom";
import { PiCoatHangerBold } from "react-icons/pi";
import { FaRecycle, FaUsers, FaShieldAlt, FaLeaf } from "react-icons/fa";
import Header from "./Header";
import HomeFooter from "./Footer";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  const values = [
    {
      id: 1,
      icon: FaRecycle,
      title: "Sustainability",
      description: "Reducing environmental impact by giving clothes a new life",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
      color: "text-[#A68B71]",
    },
    {
      id: 2,
      icon: FaUsers,
      title: "Community",
      description:
        "Connecting people who share a passion for conscious fashion",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
      color: "text-[#C3A686]",
    },
    {
      id: 3,
      icon: FaShieldAlt,
      title: "Security",
      description: "Protected and verified transactions for buyers and sellers",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      color: "text-[#A68B71]",
    },
    {
      id: 4,
      icon: FaLeaf,
      title: "Innovation",
      description: "Cutting-edge technology for a unique shopping experience",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      color: "text-[#C3A686]",
    },
  ];

  const steps = [
    {
      id: 1,
      title: "List Your Items",
      description:
        "Upload photos and descriptions of clothes you want to sell. It's quick and easy!",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      number: "1",
    },
    {
      id: 2,
      title: "Browse & Buy",
      description:
        "Discover unique fashion pieces from our community of trusted sellers.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
      number: "2",
    },
    {
      id: 3,
      title: "Secure Transactions",
      description:
        "Safe payments and shipping protection for every purchase and sale.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      number: "3",
    },
  ];

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <PiCoatHangerBold className="text-8xl mx-auto mb-6 rotate-12 text-[#A68B71]" />
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Volution Wear
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            #withVolutionwear - Where sustainable fashion revolution begins
          </p>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Volution Wear is more than just a fashion marketplace. We're a
            community dedicated to transforming the fashion industry through
            sustainable practices. We believe every garment has a story to tell
            and a second life to live.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transform transition-transform duration-300">
                    <IconComponent className="text-4xl text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="group relative overflow-hidden rounded-2xl shadow-lg mb-16 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
          <div className="h-80 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050"
              alt="Our Story"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50 p-4 md:p-8 flex items-center">
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                Our Story
              </h2>
              <p className="text-gray-200 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                Born from the idea that fashion can be beautiful, accessible,
                and sustainable at the same time, Volution Wear has
                revolutionized the way we think about wardrobes.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    10K+
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300">
                    Active Users
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    50K+
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300">Items Sold</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    Zero
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300">Fees</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    100%
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300">Trusted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transform transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#E3DAC9] to-[#C3A686] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
          <div className="h-80 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e"
              alt="Join the Revolution"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#A68B71]/90 to-[#C3A686]/90 p-6 md:p-8 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Join the Revolution
              </h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90">
                Be part of the sustainable fashion movement. Buy, sell, and
                discover unique fashion - sustainably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <button className="bg-white cursor-pointer text-[#A68B71] px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base">
                    Start Selling
                  </button>
                </Link>
                <Link to="/shop">
                  <button className="border-2 cursor-pointer border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-[#A68B71] transition-colors duration-300 text-sm md:text-base">
                    Start Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}
