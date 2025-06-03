import { Link } from "react-router-dom";
import { PiCoatHangerBold } from "react-icons/pi";
import { FaRecycle, FaUsers, FaShieldAlt, FaLeaf } from "react-icons/fa";
import Header from "./Header";
import { Footer } from "flowbite-react";
import HomeFooter from "./Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8F8F8]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#A68B71] to-[#C3A686] text-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <PiCoatHangerBold className="text-8xl mx-auto mb-6 rotate-12" />
            <h1 className="text-5xl font-bold mb-4">Volution Wear</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              #withVolutionwear - Where sustainable fashion revolution begins
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Mission Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Volution Wear is more than just a fashion marketplace. We're a
              community dedicated to transforming the fashion industry through
              sustainable practices. We believe every garment has a story to
              tell and a second life to live.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaRecycle className="text-4xl text-[#A68B71] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Sustainability
              </h3>
              <p className="text-gray-600">
                Reducing environmental impact by giving clothes a new life
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaUsers className="text-4xl text-[#C3A686] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Community
              </h3>
              <p className="text-gray-600">
                Connecting people who share a passion for conscious fashion
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaShieldAlt className="text-4xl text-[#A68B71] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Security
              </h3>
              <p className="text-gray-600">
                Protected and verified transactions for buyers and sellers
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaLeaf className="text-4xl text-[#C3A686] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600">
                Cutting-edge technology for a unique shopping experience
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Born from the idea that fashion can be beautiful, accessible,
                  and sustainable at the same time, Volution Wear has
                  revolutionized the way we think about wardrobes.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Since our launch, we've helped thousands of people discover
                  unique pieces, sell clothes they no longer wear, and
                  contribute to a greener future.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every transaction on our platform represents a step towards a
                  more responsible and conscious fashion industry.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#E3DAC9] to-[#C3A686] rounded-xl p-8 text-white">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">10K+</h3>
                      <p className="text-sm opacity-90">Active Users</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">50K+</h3>
                      <p className="text-sm opacity-90">Items Sold</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Zero</h3>
                      <p className="text-sm opacity-90">Fees</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">100%</h3>
                      <p className="text-sm opacity-90">Trusted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-gradient-to-r from-[#E3DAC9] to-[#C3A686] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  List Your Items
                </h3>
                <p className="text-gray-600">
                  Upload photos and descriptions of clothes you want to sell.
                  It's quick and easy!
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-gradient-to-r from-[#E3DAC9] to-[#C3A686] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Browse & Buy
                </h3>
                <p className="text-gray-600">
                  Discover unique fashion pieces from our community of trusted
                  sellers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-gradient-to-r from-[#E3DAC9] to-[#C3A686] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Secure Transactions
                </h3>
                <p className="text-gray-600">
                  Safe payments and shipping protection for every purchase and
                  sale.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#A68B71] to-[#C3A686] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the sustainable fashion movement. Buy, sell, and
              discover unique fashion - sustainably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="bg-white cursor-pointer text-[#A68B71] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Start Selling
                </button>
              </Link>
              <Link to="/shop">
                <button className="border-2 cursor-pointer border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#A68B71] transition-colors duration-300">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
