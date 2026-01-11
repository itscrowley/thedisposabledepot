// app/admin/components/ListManagerModal.js
import React from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function ListManagerModal({ state, actions, theme }) {
  const { listManager, newItemInput, darkMode } = state;
  const { setListManager, setNewItemInput, addItemToList, removeItemFromList, handleListSelect, moveListItem } = actions;

  return (
    // 🔥 FIXED: 
    // 1. 'items-start' -> Mobile pe popup TOP pe chipkega.
    // 2. 'pt-20' -> Mobile pe upar se thoda gap dega taaki chipke na.
    // 3. 'md:items-center md:pt-0' -> Desktop pe wapis CENTER me aayega.
    <div className="fixed inset-0 z-[100000] flex justify-center items-start pt-20 md:items-center md:pt-0 bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
       
       {/* 🔥 Modal Container */}
       <div className={`
            relative w-[95%] md:w-full md:max-w-md 
            max-h-[80vh] flex flex-col 
            p-5 rounded-2xl shadow-2xl border 
            ${theme.card} 
            ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} 
            animate-in slide-in-from-top-10 md:zoom-in-95 duration-200
       `}>
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-3 shrink-0">
             <h3 className={`font-bold text-lg ${theme.textMain}`}>{listManager.title}</h3>
             <button 
                onClick={() => setListManager({ ...listManager, isOpen: false })}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
             >
                <X size={24} className="text-slate-400 hover:text-red-500"/>
             </button>
          </div>
          
          {/* Input Area */}
          <div className="flex gap-2 mb-4 shrink-0">
             <input 
                type="text" 
                value={newItemInput} 
                onChange={(e) => setNewItemInput(e.target.value)} 
                placeholder="Add or Search..." 
                className={`flex-1 p-3 rounded-xl border text-base ${theme.input} focus:border-orange-500 outline-none`} 
                onKeyDown={(e) => e.key === 'Enter' && addItemToList()} 
             />
             {(listManager.type !== 'id' && listManager.type !== 'title') && (
                <button 
                    onClick={addItemToList} 
                    className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-500 flex items-center justify-center active:scale-95 transition-transform"
                >
                    <Plus size={24}/>
                </button>
             )}
          </div>

          {/* List Area (Auto Scroll inside popup) */}
          <div className="overflow-y-auto pr-1 custom-scrollbar flex-1 min-h-0">
             {listManager.items.length > 0 ? (
               <div className="space-y-2 pb-2">
                 {listManager.items.map((item, index) => (
                   <div key={index} className={`flex items-center gap-3 p-3 rounded-xl border active:scale-[0.99] transition-transform ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       
                       {/* Reorder Arrows */}
                       {(listManager.type !== 'id' && listManager.type !== 'title') && (
                         <div className="flex flex-col gap-1">
                            <button onClick={() => moveListItem(index, 'up')} disabled={index === 0} className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 ${index === 0 ? 'opacity-20' : 'text-orange-500'}`}><ArrowUp size={16}/></button>
                            <button onClick={() => moveListItem(index, 'down')} disabled={index === listManager.items.length - 1} className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 ${index === listManager.items.length - 1 ? 'opacity-20' : 'text-orange-500'}`}><ArrowDown size={16}/></button>
                         </div>
                       )}

                       <span 
                         className={`flex-1 text-base font-medium break-all ${theme.textMain} ${(listManager.type === 'id' || listManager.type === 'title') ? 'cursor-pointer hover:text-orange-500 underline ml-2' : ''}`}
                         onClick={() => (listManager.type === 'id' || listManager.type === 'title') ? handleListSelect(item) : null}
                       >
                         {item}
                       </span>
                       
                       <button 
                            onClick={() => removeItemFromList(index, item)} 
                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                           <Trash2 size={20} />
                       </button>
                   </div>
                 ))}
               </div>
             ) : ( <p className="text-center text-slate-500 text-sm py-4">No items found.</p> )}
          </div>
       </div>
    </div>
  );
}