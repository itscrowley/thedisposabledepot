'use client';
import { useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    'Plastic Containers', 'Paper Cups', 'Biodegradable Plates', 'Cutlery', 'Aluminum Foil'
  ]);
  const [inputVal, setInputVal] = useState('');

  const addCat = () => {
    if (inputVal) {
      setCategories([...categories, inputVal]);
      setInputVal('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Add Category Box */}
      {/* ✅ Added 'admin-card' class here */}
      <div className="admin-card p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
        <input 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="New Category Name..."
          className="flex-1 w-full rounded-lg px-4 py-3 outline-none" 
        />
        <button onClick={addCat} className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 shadow-md w-full md:w-auto">
          Add
        </button>
      </div>

      {/* Categories List */}
      {/* ✅ Added 'admin-card' class here */}
      <div className="admin-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
             <h3 className="text-lg font-bold opacity-90">All Categories</h3>
        </div>
        
        <div>
          {categories.map((cat, idx) => (
            <div key={idx} className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:opacity-80 transition">
              <span className="font-medium text-lg">{cat}</span>
              <button 
                onClick={() => setCategories(categories.filter(c => c !== cat))}
                className="text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg text-sm font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
