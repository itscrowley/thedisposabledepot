"use client";
import React, { useState } from 'react';
import { ShoppingCart, Check, Trash2, ChevronRight, Info, Flame, Sparkles } from 'lucide-react';

const menuData = [
  {
    id: "soup",
    category: "🥣 Starters & Soups",
    items: [
      { id: "soup_hot", name: "Hot Soup", sub: "Tomato / Corn", icon: "🥣", rec: { name: "250ml Silver Bowl", type: "Silver Paper" } },
      { id: "snacks_dry", name: "Dry Snacks", sub: "Tikka / Samosa", icon: "🍢", rec: { name: "6-inch Bio Plate", type: "Eco-Friendly" } }
    ]
  },
  {
    id: "main_course",
    category: "🍱 Main Course",
    items: [
      { id: "full_meal", name: "Full Thali", sub: "Roti + Sabji + Dal", icon: "🍱", rec: { name: "5-CP Heavy Partition", type: "Hard Plastic" } },
      { id: "rice_only", name: "Rice/Biryani", sub: "Jeera Rice / Pulao", icon: "🍛", rec: { name: "10-inch Round Bio", type: "Bagasse" } }
    ]
  },
  {
    id: "beverages",
    category: "🥤 Drinks & Desserts",
    items: [
      { id: "tea", name: "Tea/Coffee", sub: "Hot Beverages", icon: "☕", rec: { name: "150ml Ripple Cup", type: "Premium Paper" } },
      { id: "cold_drink", name: "Cold Drink", sub: "Juice / Water", icon: "🥤", rec: { name: "250ml Clear Glass", type: "Plastic" } },
      { id: "ice_cream", name: "Ice Cream", sub: "Scoops / Cups", icon: "🍦", rec: { name: "100ml Cup + Spoon", type: "Paper" } }
    ]
  }
];

export default function SmartMenuPlanner() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const generateWhatsAppLink = () => {
    if (selectedItems.length === 0) return;
    let message = "👋 Hi Disposable Depot! I need a wholesale quote for:\n\n";
    selectedItems.forEach((item, index) => {
      message += `✅ ${item.name} -> Need: ${item.rec.name}\n`;
    });
    message += "\nPlease share best rates.";
    const phoneNumber = "919814812623"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 sm:px-6">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-orange-200">
          <Flame size={16} className="fill-orange-500" /> Smart Event Planner
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Plan Your Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Perfectly</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select your menu items below to find the perfect disposable matches.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Menu Selection */}
        <div className="lg:col-span-2 space-y-8">
          {menuData.map((section) => (
            <div key={section.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100/50">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {section.category}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.items.map((item) => {
                  const isSelected = selectedItems.find((i) => i.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`group relative p-4 rounded-2xl transition-all duration-300 border-2 text-left
                        ${isSelected 
                          ? 'border-orange-500 bg-orange-50 shadow-orange-200 shadow-lg scale-[1.02]' 
                          : 'border-slate-100 bg-white hover:border-orange-200 hover:shadow-md hover:-translate-y-1'}`}
                    >
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                      <div className="font-bold text-slate-800 text-sm md:text-base leading-tight">{item.name}</div>
                      <div className="text-xs text-slate-500 mt-1 font-medium">{item.sub}</div>
                      
                      {isSelected ? (
                        <div className="absolute top-3 right-3 bg-orange-500 text-white p-1 rounded-full shadow-lg animate-in zoom-in duration-200">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Smart Cart (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-3xl overflow-hidden shadow-2xl border border-orange-100 bg-white/90 backdrop-blur-xl">
            
            {/* Header with Orange Gradient */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    Your List
                  </h3>
                  <p className="text-orange-100 text-xs mt-1">Ready for wholesale quote</p>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/30 backdrop-blur-md">
                  {selectedItems.length} Items
                </span>
              </div>
            </div>

            {/* List Items */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3 bg-orange-50/30">
              {selectedItems.length === 0 ? (
                <div className="text-center py-12 px-6 border-2 border-dashed border-orange-200 rounded-2xl bg-white/50">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-400">
                    <ShoppingCart size={28} />
                  </div>
                  <p className="text-slate-900 font-medium">Your list is empty</p>
                  <p className="text-slate-500 text-sm mt-1">Select menu items to see magic suggestions.</p>
                </div>
              ) : (
                selectedItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-100 group hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center text-xl shadow-inner text-orange-600">
                      {item.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">{item.name}</p>
                      </div>
                      <h4 className="font-bold text-slate-800 leading-tight mt-0.5">{item.rec.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200">
                          {item.rec.type}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleItem(item)}
                      className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors self-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Action */}
            {selectedItems.length > 0 && (
              <div className="p-5 bg-white border-t border-orange-100">
                <div className="flex items-start gap-3 mb-4 p-3 bg-orange-50 rounded-lg text-orange-800 text-xs border border-orange-100">
                  <Info size={16} className="shrink-0 mt-0.5 text-orange-500" />
                  <p>Our team will calculate exact quantities based on your guest count.</p>
                </div>
                <button 
                  onClick={generateWhatsAppLink}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-orange-500/30 group"
                >
                  <span>Get Wholesale Quote</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
    }
