import { useState } from "react";
import Header from "./Header";
import img from "../VID-IMG/pexels-blitzboy-1040945.jpg";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("Nero");
  const [activeTab, setActiveTab] = useState<string>("description");

  // Colori disponibili
  const colors = ["Nero", "Bianco", "Blu", "Rosso"];

  // Caratteristiche del prodotto
  const productFeatures = [
    "Materiale premium",
    "Design ergonomico",
    "Resistente all'acqua",
    "Garanzia di 2 anni",
  ];

  return (
    <div className="px-4 md:px-8 lg:px-11 pb-16 bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 mt-4">
        Home / Collezione /{" "}
        <span className="font-medium text-gray-800">Prodotto</span>
      </div>

      {/* Product Section */}
      <div className="flex flex-wrap justify-between gap-8 bg-white p-6 rounded-lg shadow-sm">
        {/* Product Image */}
        <div className="flex-1 min-w-[280px]">
          <img
            src={img}
            alt="Product Image"
            className="w-full max-w-[700px] object-cover rounded-md"
          />

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer ${
                  i === 0 ? "border-black" : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(126 recensioni)</span>
          </div>

          {/* Title */}
          <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
            Elegante Giacca in Pelle Premium
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">445 EUR</span>
            <span className="text-lg text-gray-500 line-through">599 EUR</span>
            <span className="bg-red-100 text-red-700 px-2 py-1 text-sm font-medium rounded">
              -25%
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Una giacca in pelle di altissima qualità, realizzata con materiali
            premium e lavorata a mano da artigiani esperti. Perfetta per ogni
            occasione, combina eleganza e funzionalità in un design senza tempo.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-2">
            <span className="font-medium">Caratteristiche:</span>
            <ul className="grid grid-cols-2 gap-2">
              {productFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-3">
            <span className="font-medium">Colore: {selectedColor}</span>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black ring-2 ring-gray-300"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor:
                      color === "Nero"
                        ? "#000"
                        : color === "Bianco"
                        ? "#fff"
                        : color === "Blu"
                        ? "#2563eb"
                        : "#dc2626",
                  }}
                  aria-label={`Colore ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Quantità:</span>
            <div className="flex border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r border-gray-300"
              >
                <ChevronDown size={16} />
              </button>
              <span className="px-4 py-1 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l border-gray-300"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-2">
            <button className="bg-black text-white py-3 px-6 rounded flex-1 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <ShoppingCart size={18} />
              <span>AGGIUNGI AL CARRELLO</span>
            </button>
          
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-4 mt-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span>✓</span> Spedizione gratuita per ordini superiori a 100€
            </p>
            <p className="flex items-center gap-2">
              <span>✓</span> Consegna stimata: 3-5 giorni lavorativi
            </p>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          {["description", "details", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab === "description"
                ? "Descrizione"
                : tab === "details"
                ? "Dettagli"
                : "Recensioni"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Questa giacca in pelle di alta qualità è stata creata per durare
                nel tempo. Realizzata con pelle di prima scelta, offre comfort e
                stile in ogni stagione. Il design minimalista la rende facile da
                abbinare con qualsiasi outfit, mentre i dettagli curati mostrano
                l'attenzione artigianale.
              </p>
              <p className="text-gray-700 leading-relaxed">
                La fodera interna garantisce comfort anche nelle giornate più
                fresche, mentre le tasche multiple offrono praticità senza
                compromettere l'estetica. Perfetta per un look casual o più
                elegante, questa giacca è un investimento che valorizzerà il tuo
                guardaroba per anni.
              </p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Specifiche</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Materiale:</span> 100% vera
                    pelle
                  </li>
                  <li>
                    <span className="font-medium">Fodera:</span> 100% poliestere
                  </li>
                  <li>
                    <span className="font-medium">Chiusura:</span> Zip frontale
                  </li>
                  <li>
                    <span className="font-medium">Tasche:</span> 4 esterne, 2
                    interne
                  </li>
                  <li>
                    <span className="font-medium">Manutenzione:</span> Pulizia
                    professionale
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">Dimensioni</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium">Taglia</th>
                      <th className="text-left py-2 font-medium">Petto (cm)</th>
                      <th className="text-left py-2 font-medium">
                        Lunghezza (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2">S</td>
                      <td className="py-2">94-98</td>
                      <td className="py-2">68</td>
                    </tr>
                    <tr>
                      <td className="py-2">M</td>
                      <td className="py-2">98-104</td>
                      <td className="py-2">70</td>
                    </tr>
                    <tr>
                      <td className="py-2">L</td>
                      <td className="py-2">104-110</td>
                      <td className="py-2">72</td>
                    </tr>
                    <tr>
                      <td className="py-2">XL</td>
                      <td className="py-2">110-116</td>
                      <td className="py-2">74</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Basato su 126 recensioni
                  </p>
                </div>
                <div className="flex-1 max-w-md">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-6">
                        {rating}
                      </span>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full"
                          style={{
                            width: `${
                              rating === 5
                                ? 70
                                : rating === 4
                                ? 20
                                : rating === 3
                                ? 7
                                : rating === 2
                                ? 2
                                : 1
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5
                          ? "70%"
                          : rating === 4
                          ? "20%"
                          : rating === 3
                          ? "7%"
                          : rating === 2
                          ? "2%"
                          : "1%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-50">
                Scrivi una recensione
              </button>

              {/* Sample Reviews */}
              <div className="divide-y divide-gray-100">
                {[
                  {
                    name: "Marco R.",
                    rating: 5,
                    date: "15 Marzo 2025",
                    comment:
                      "Qualità eccezionale e vestibilità perfetta. La uso quasi ogni giorno e dopo due mesi sembra ancora nuova.",
                  },
                  {
                    name: "Giulia M.",
                    rating: 4,
                    date: "28 Febbraio 2025",
                    comment:
                      "Bellissima giacca, materiale ottimo. Tolgo una stella solo perché le maniche sono un po' lunghe.",
                  },
                  {
                    name: "Alessandro B.",
                    rating: 5,
                    date: "10 Febbraio 2025",
                    comment:
                      "Acquisto che consiglio vivamente. La qualità della pelle è eccezionale e la costruzione impeccabile.",
                  },
                ].map((review, index) => (
                  <div key={index} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
