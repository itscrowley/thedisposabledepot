"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, Trash2, ChevronRight, Users, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

const menuData = [
  {
    id: "starters",
    category: "Starters & Soups",
    items: [
      { id: "soup", name: "Tomato/Corn Soup", icon: "🥣", rec: { name: "250ml Silver Bowl", type: "Silver Paper", factor: 1.1 } }, // factor 1.1 means 10% extra buffer
      { id: "tikka", name: "Paneer Tikka/Snacks", icon: "🍢", rec: { name: "6-inch Bio Plate", type: "Eco-Friendly", factor: 1.2 } }
    ]
  },
  {
    id: "main",
    category: "Main Course",
    items: [
      { id: "thali", name: "Full Roti-Sabji Meal", icon: "🍱", rec: { name: "5-CP Heavy Partition", type: "Hard Plastic", factor: 1.05 } },
      { id: "rice", name: "Biryani/Rice Only", icon: "🍛", rec: { name: "10-inch Round Bio", type: "Bagasse", factor: 1.1 } }
    ]
  },
  {
    id: "drinks",
    category: "Beverages & Desserts",
    items: [
      { id: "coffee", name: "Hot Coffee/Tea", icon: "☕", rec: { name: "150ml Ripple Cup", type: "Premium Paper", factor: 1.2 } },
      { id: "water", name: "Water/Cold Drink", icon: "🥤", rec: { name: "250ml Clear Glass", type: "Plastic", factor: 1.5 } }, // People drink more water
      { id: "sweet", name: "Ice Cream/Halwa", icon: "🍦", rec: { name: "100ml Cup + Spoon", type: "Paper", factor: 1.1 } }
    ]
  }
];

export default function SmartMenuPlanner() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [guestCount, setGuestCount] = useState(50);
  const [showCartMobile, setShowCartMobile] = useState(false);

  // Toggle Selection
  const toggleItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // WhatsApp Logic with Quantity
  const generateWhatsAppLink = () => {
    if (selectedItems.length === 0) return;
    let message = `👋 Hi Disposable Depot! \n🎉 I am planning an event for *${guestCount} Guests*.\n\nHere is my requirement:\n`;
    
    selectedItems.forEach((item) => {
      const qty = Math.ceil(guestCount * item.rec.factor);
      message += `-------------------\n🍱 Menu: ${item.name}\n📦 Need: *${item.rec.name}*\n🔢 Approx Qty: ~${qty} pcs\n`;
    });
    
    message += `\n-------------------\nPlease share the best quotation.`;
    const phoneNumber = "919814812623"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
      {/* Dark Overlay for Glass Effect visibility */}
      <div className="min-h-screen bg-black/40 backdrop-blur-sm py-8 px-4 md:px-8">
        
        {/* --- HERO & GUEST COUNTER --- */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-10 text-center shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/30 rounded-full blur-[100px]"></div>
            
            <h1 className="relative text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
              Event <span className="text-orange-400">Calculator</span>
            </h1>
            <p className="relative text-gray-200 mb-8">Select your menu & guests to get an instant requirement list.</p>

            {/* Guest Slider */}
            <div className="relative max-w-xl mx-auto bg-black/30 p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3 text-orange-400 font-bold text-lg">
                <Users size={24} />
                <span>Guests:</span>
              </div>
              <input 
                type="range" 
                min="10" max="1000" step="10" 
                value={guestCount} 
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="bg-orange-500 text-white font-bold px-6 py-2 rounded-xl min-w-[100px]">
                {guestCount}
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
          
          {/* LEFT: MENU (Glass Cards) */}
          <div className="lg:col-span-2 space-y-8">
            {menuData.map((section) => (
              <div key={section.id}>
                <h3 className="text-white/90 font-bold text-xl mb-4 flex items-center gap-2 pl-2">
                  <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
                  {section.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.items.map((item) => {
                    const isSelected = selectedItems.find((i) => i.id === item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item)}
                        className={`group relative flex items-center p-4 rounded-2xl transition-all duration-300 border backdrop-blur-md overflow-hidden text-left
                          ${isSelected 
                            ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}`}
                      >
                        <span className="text-4xl mr-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                        <div>
                          <p className={`font-bold text-lg ${isSelected ? 'text-orange-400' : 'text-white'}`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Use: {item.rec.name}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-0 right-0 p-2">
                             <div className="bg-orange-500 rounded-bl-xl rounded-tr-xl p-1">
                               <Check size={14} className="text-white" />
                             </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SMART CART (Hidden on mobile initially) */}
          <div className={`fixed inset-0 z-50 lg:static lg:inset-auto lg:z-auto bg-black/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-0 transition-transform duration-300 
            ${showCartMobile ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}`}>
            
            <div className="h-full lg:h-auto lg:sticky lg:top-6 flex flex-col">
              {/* Mobile Close Handle */}
              <div className="lg:hidden p-4 flex justify-end">
                <button onClick={() => setShowCartMobile(false)} className="text-white p-2">Close X</button>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex-1 flex flex-col">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    <Sparkles size={20} className="text-yellow-300" />
                    Requirement List
                  </h3>
                  <p className="text-orange-100 text-sm opacity-80 mt-1">Based on {guestCount} Guests</p>
                </div>

                <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3 flex-1">
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <p>Select items from the menu to calculate quantities.</p>
                    </div>
                  ) : (
                    selectedItems.map((item, idx) => {
                      const qty = Math.ceil(guestCount * item.rec.factor);
                      return (
                        <div key={idx} className="bg-black/20 rounded-xl p-3 border border-white/5 animate-in slide-in-from-bottom-2">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <span>{item.icon} {item.name}</span>
                            </div>
                            <button onClick={() => toggleItem(item)} className="text-red-400 hover:text-red-300"><Trash2 size={14}/></button>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-8 border-l border-dashed border-white/20"></div>
                            <ArrowRight size={14} className="text-orange-500" />
                            <div className="flex-1">
                               <p className="text-orange-400 font-bold text-md leading-tight">{item.rec.name}</p>
                               <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">{item.rec.type}</span>
                            </div>
                          </div>

                          <div className="bg-orange-500/10 rounded-lg p-2 flex justify-between items-center border border-orange-500/20">
                            <span className="text-xs text-orange-200">Est. Qty:</span>
                            <span className="text-lg font-bold text-white">{qty} <span className="text-xs font-normal">pcs</span></span>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {selectedItems.length > 0 && (
                  <div className="p-4 bg-black/20 border-t border-white/10">
                     <button 
                      onClick={generateWhatsAppLink}
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-green-500/30 group"
                    >
                      <MessageCircle size={24} className="fill-current" />
                      <div className="text-left leading-tight">
                        <span className="block text-xs font-normal opacity-90">Send to WhatsApp</span>
                        <span className="block text-sm">Get Price for {guestCount} Guests</span>
                      </div>
                      <ChevronRight className="ml-auto opacity-50 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE FLOATING BUTTON (Only visible on small screens) */}
          <div className="fixed bottom-6 right-6 lg:hidden z-40">
            <button 
              onClick={() => setShowCartMobile(true)}
              className="bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 border-2 border-orange-400 relative"
            >
              <ShoppingCart size={24} />
              <span className="font-bold">{selectedItems.length}</span>
              {selectedItems.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
            }
                  
