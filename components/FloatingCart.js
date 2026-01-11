'use client';
import React from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const sendCartToWhatsApp = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "919814812623";
    let message = `🧾 *QUOTATION REQUEST* \n----------------------------------\n`;
    
    cartItems.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}* \n   📦 Qty: ${item.qty} ${item.unit}\n`;
      if(item.notes) message += `   📝 Note: ${item.notes}\n`;
      message += `\n`;
    });

    message += `----------------------------------\n💡 *Total Items:* ${totalItems}\n\nHi, please send me the best wholesale rates for this list.`;

    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  // Button hamesha dikhana hai agar cart open hai ya items hain
  if (totalItems === 0 && !isCartOpen) return null; 

  return (
    <>
      <style jsx global>{`
        /* --- Genie/Pop-up Animation (MacBook Style) --- */
        @keyframes popOut {
          from { 
            opacity: 0; 
            transform: scale(0.5) translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .cart-popup-anim {
          transform-origin: bottom right; 
          animation: popOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Global CSS Variables Sync */
        .fc-panel { 
            background-color: var(--card-bg); 
            color: var(--text-main); 
            border: 1px solid rgba(0,0,0,0.1);
        }
        body.dark-mode .fc-panel { border: 1px solid rgba(255,255,255,0.1); }

        .fc-surface { 
            background-color: var(--bg-body);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            color: var(--text-main); 
        }
        body.dark-mode .fc-surface { border-bottom: 1px solid rgba(255,255,255,0.1); }

        .fc-card { 
            background-color: var(--bg-body); 
            border: 1px solid rgba(0,0,0,0.05); 
            box-shadow: 0 2px 5px var(--shadow-color);
        }
        body.dark-mode .fc-card { border: 1px solid rgba(255,255,255,0.05); }

        .fc-text-main { color: var(--text-main); }
        .fc-text-sub { color: var(--text-muted); }
        
        .fc-qty-btn {
            background-color: var(--card-bg);
            color: var(--text-main);
            border: 1px solid rgba(0,0,0,0.1);
        }
        body.dark-mode .fc-qty-btn { border: 1px solid rgba(255,255,255,0.2); }
      `}</style>

      {/* ==========================
          FLOATING BUTTON 
      ========================== */}
      <button
        onClick={toggleCart}
        className={`
            fixed z-[101] group flex items-center justify-center rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95
            
            /* === 📱 MOBILE SETTINGS (Small Screens) === */
            bottom-24 right-7   /* Position: BackToTop se upar */
            w-14 h-14           /* Size: Touch Friendly */

            /* === 💻 DESKTOP SETTINGS (Large Screens) === */
            md:bottom-24 md:right-8  /* Position: Corner mein */
            md:w-16 md:h-16           /* Size: Thoda Bada */
        `}
        style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.5)'
        }}
      >
        <div className="relative">
            {isCartOpen ? (
                <X size={26} className="text-white" />
            ) : (
                <ShoppingCart size={26} className="text-white" />
            )}
            
            {!isCartOpen && totalItems > 0 && (
            <span className="absolute -top-6 -right-4 bg-white text-orange-600 text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full shadow-sm border-2 border-orange-100">
                {totalItems}
            </span>
            )}
        </div>
      </button>

      {/* ==========================
          POP-UP WINDOW 
      ========================== */}
      {isCartOpen && (
        <>
            {/* Invisible Backdrop (Click outside to close) */}
            <div 
                className="fixed inset-0 z-[99] bg-transparent"
                onClick={toggleCart}
            ></div>

            {/* The Window Itself */}
            <div 
                className={`
                    cart-popup-anim fixed flex flex-col rounded-3xl shadow-2xl fc-panel overflow-hidden z-[100]
                    
                    /* === 📱 MOBILE SETTINGS === */
                    bottom-40 right-5        /* Button ke just upar */
                    w-[90vw] max-h-[60vh]    /* Width: 90% screen width (Drawer feel) */

                    /* === 💻 DESKTOP SETTINGS === */
                    md:bottom-32 md:right-10 /* Desktop button ke upar */
                    md:w-[380px] md:max-h-[70vh] /* Width: Fixed standard size */
                `}
                style={{
                    boxShadow: '0 20px 60px -10px rgba(0,0,0,0.3)'
                }}
            >
                
                {/* 1. Header Area */}
                <div className="fc-surface p-5 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 fc-text-main">
                        Order List
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">
                            {totalItems} Items
                        </span>
                        </h2>
                    </div>
                    {/* Clear Button */}
                    {cartItems.length > 0 && (
                        <button 
                            onClick={clearCart}
                            className="text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* 2. Scrollable List Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 opacity-60 fc-text-sub">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <ShoppingCart size={28} />
                            </div>
                            <p className="text-sm font-medium">Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                        <div 
                            key={item.id} 
                            className="fc-card p-3 rounded-xl transition-shadow duration-200"
                        >
                            {/* Item Top Row */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 p-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
                                        <FileText size={16} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm leading-tight fc-text-main">
                                            {item.name}
                                        </h3>
                                        {item.notes && (
                                            <div className="mt-1 flex items-start gap-1 text-[10px] fc-text-sub bg-black/5 dark:bg-white/5 p-1 rounded">
                                                <span className="font-bold">Note:</span> {item.notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="fc-text-sub hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Item Bottom Row (Controls) */}
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed" style={{borderColor: 'rgba(128,128,128,0.2)'}}>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2 py-1 rounded fc-text-sub">
                                    {item.unit}
                                </span>

                                <div className="flex items-center gap-1 rounded-xl p-0.5">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                                        className="fc-qty-btn w-6 h-6 flex items-center justify-center rounded shadow-sm hover:text-orange-600 active:scale-95 transition-all"
                                        disabled={item.qty <= 1}
                                    >
                                        <Minus size={12} strokeWidth={3} />
                                    </button>
                                    <span className="w-8 text-center font-bold text-sm fc-text-main">{item.qty}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                                        className="fc-qty-btn w-6 h-6 flex items-center justify-center rounded shadow-sm hover:text-orange-600 active:scale-95 transition-all"
                                    >
                                        <Plus size={12} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>

                {/* 3. Footer Action Area */}
                {cartItems.length > 0 && (
                    <div className="fc-surface p-4 border-t z-20" style={{borderTopColor: 'rgba(128,128,128,0.1)'}}>
                        <div className="flex justify-between items-center mb-3 fc-text-sub text-xs">
                            <span>Total Unique Items</span>
                            <span className="font-bold fc-text-main text-base">{cartItems.length}</span>
                        </div>

                        <button 
                            onClick={sendCartToWhatsApp}
                            className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                            style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
                        >
                            <span>Request Price on WhatsApp</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </>
      )}
    </>
  );
}