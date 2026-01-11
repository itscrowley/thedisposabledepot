'use client'; 

import React, { useState, useEffect } from 'react';
import { Send, Phone, MoreVertical, Video, Plus } from 'lucide-react'; 
import { useCart } from '../context/CartContext'; // Import context hook

export default function WhatsAppOrder() {
  const { addToCart } = useCart(); // Access addToCart function

  // --- 1. STATES ---
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState('');
  const [notes, setNotes] = useState('');
  
  // Naya State: Options store karne ke liye
  const [qtyOptions, setQtyOptions] = useState([]); 

  // --- 2. LOGIC: QUANTITY CALCULATOR ---
  useEffect(() => {
    let unit = "Packets/Units";
    const max = 100; // 1 se 100 tak ginti

    // Agar Water ya Box wala item hai to "Box" likhega
    if (category.includes("Water") || category.includes("Box")) {
      unit = "Box";
      if (category.includes("Water")) { unit = "Boxes"; }
    }

    const options = [];
    // Loop chalaya 1 se 100 tak
    for (let i = 1; i <= max; i++) {
      let labelUnit = i === 1 ? unit.replace("es", "") : unit; // Singular/Plural fix
      if (unit === "Boxes" && i === 1) labelUnit = "Box";
      options.push(`${i} ${labelUnit}`);
    }
    
    setQtyOptions(options);
    setQty(""); // Jab product badle to quantity reset ho jaye
  }, [category]);


  // --- 3. FUNCTION (Add to Cart Handler) ---
  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!category || !qty) {
      alert("Please select a Product and Quantity!");
      return;
    }

    // Extract numeric quantity for calculations
    const numericQty = parseInt(qty.split(' ')[0]);
    const unitStr = qty.split(' ').slice(1).join(' ');

    const newItem = {
        id: category + '-' + unitStr, // Simple unique ID generation
        name: category,
        qty: numericQty,
        unit: unitStr,
        notes: notes
    };

    addToCart(newItem);
    
    // Optional: Reset form after adding
    setCategory('');
    setQty('');
    setNotes('');
    // alert("Item added to cart!"); // Or rely on the cart modal opening
  };

  return (
    <section className="section" id="order">
        <h2 className="section-title">Quick WhatsApp Order</h2>
        
        <div className="wa-card">
          <div className="wa-header">
            <div className="wa-profile-pic">
              <img 
                src="/logo.png" 
                alt="DP" 
                style={{ height: '50px', width: '50px', objectFit: 'cover', borderRadius: '50%' }} 
              />
            </div>
            <div className="wa-info">
              <h3 className="wa-name">The Disposable Depot <span className="wa-verified">✔</span></h3>
              <p className="wa-status">online</p>
            </div>
            <div className="flex gap-3 text-white">
                 <Video size={20} />
                 <Phone size={20} />
                 <MoreVertical size={20} />
            </div>
          </div>

          <div className="wa-body">
            
            <div className="msg-row incoming">
              <div className="msg-bubble">
                <p>Hello! 👋 Welcome to our online portal. Please select your order below.</p>
                <span className="msg-time">10:10 AM</span>
              </div>
            </div>

            <form onSubmit={handleAddToCart} className="wa-form">
              
              {/* Product Select */}
              <div className="msg-row outgoing">
                <div className="msg-bubble green-bubble">
                  <label className="bubble-label">Product</label>
                  <select 
                    id="category" 
                    required 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white" // Theme support
                  >
                    <option value="">👇 Select Item...</option>
                    <option>Packaged Water Cups (Box)</option>
                    <option>Water Bottles - 250ml</option>
                    <option>Water Bottles - 1 Ltr</option>
                    <option>Water Bottles - 5 Ltr</option>
                    <option>Disposable Coffee Glass</option>
                    <option>Ping Pong Glass</option>
                    <option>Disposable Plates</option>
                    <option>Disposable Round Plate</option>
                    <option>Glass with Lid</option>
                    <option>Plastic Bowls</option>
                    <option>Aluminium & Cling Foils</option>
                    <option>Paper Napkins</option>
                    <option>Plastic Spoons</option>
                    <option>Soft Drinks</option>
                    <option>Other / Mixed Order</option>
                  </select>
                  <div className="msg-meta">
                    <span className="msg-time">Now</span>
                    <span className="double-tick">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Quantity Select */}
              <div className="msg-row outgoing">
                <div className="msg-bubble green-bubble">
                  <label className="bubble-label">Quantity</label>
                  <select 
                    id="qtySelect" 
                    required 
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">👇 Select Qty...</option>
                    {qtyOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="msg-meta">
                    <span className="msg-time">Now</span>
                    <span className="double-tick">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Notes Input */}
              <div className="msg-row outgoing">
                <div className="msg-bubble green-bubble">
                  <label className="bubble-label">Notes</label>
                  <textarea 
                    id="notes" 
                    rows="1" 
                    placeholder="Type special instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white placeholder-gray-400"
                  ></textarea>
                  <div className="msg-meta">
                    <span className="msg-time">Now</span>
                    <span className="double-tick">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Footer / Add To Cart Button */}
              <div className="wa-footer-bar">
                <div className="wa-spoof-input text-gray-500">Add item to cart...</div>
                
                <button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-md flex items-center justify-center transition-colors"
                    title="Add to Cart"
                >
                  <Plus size={24} />
                </button>
              </div>

            </form>
          </div>
        </div>

        <div style={{ height: "50px" }}></div>
    </section>
  );
}