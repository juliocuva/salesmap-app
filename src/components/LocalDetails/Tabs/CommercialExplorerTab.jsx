import React, { useState } from 'react';
import { nearbyCommerce } from '../../../data/mockData';
import { Store, Coffee, IceCream, Dog, Pill } from 'lucide-react';

const categoryIcons = {
  "Cafetería": Coffee,
  "Heladería": IceCream,
  "Petshop": Dog,
  "Droguería": Pill
};

const categoryColors = {
  "Cafetería": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "Heladería": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "Petshop": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' },
  "Droguería": { bg: '#d2f0f4', text: '#23545b', border: '#a3d9e0' }
};

export default function CommercialExplorerTab() {
  const uniqueCategories = [...new Set(nearbyCommerce.map(c => c.category))];
  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);

  const filteredCommerce = nearbyCommerce.filter(c => c.category === selectedCategory);

  return (
    <div className="animate-fade-in flex-col gap-4 flex">
      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        {uniqueCategories.map(cat => {
          const Icon = categoryIcons[cat] || Store;
          const isActive = selectedCategory === cat;
          const colors = categoryColors[cat] || { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
          
          // Count places in this category
          const count = nearbyCommerce.filter(c => c.category === cat).length;
          
          return (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="flex flex-col justify-between p-4 transition-all text-left"
              style={{
                background: colors.bg,
                color: colors.text,
                borderRadius: '16px',
                border: 'none',
                outline: 'none',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'none',
                minHeight: '110px'
              }}
            >
              <div className="flex items-center gap-2 mb-1 font-semibold opacity-90" style={{ fontSize: '12px' }}>
                <Icon size={14} strokeWidth={isActive ? 2.5 : 2} /> {cat}s
              </div>
              <div className="font-bold mb-2 text-center w-full" style={{ fontSize: '16px' }}>{count} {count === 1 ? 'local' : 'locales'}</div>
              <div className="flex items-center justify-between mb-1 opacity-80 w-full" style={{ fontSize: '11px' }}>
                <span>Radio 1.5km</span>
                <span>Ver lista</span>
              </div>
              <div style={{ background: colors.border, height: '6px', borderRadius: '3px', width: '100%' }}>
                <div style={{ background: colors.text, height: '100%', borderRadius: '3px', width: isActive ? '100%' : '30%', transition: 'width 0.3s ease' }}></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flat-card p-1 flex flex-col max-h-[280px] overflow-y-auto">
        {filteredCommerce.length === 0 ? (
          <p className="text-center text-sm text-dark-secondary p-4">No se encontraron comercios en esta categoría.</p>
        ) : (
          filteredCommerce.map((item) => (
            <div key={item.id} className="p-2 border-b border-flat last:border-0 hover:bg-[#f8fafc] transition-colors rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold flex items-center gap-2 text-dark-primary leading-none" style={{ fontSize: '12px' }}>
                    <Store size={12} style={{ color: '#47939e' }} /> {item.name}
                  </h4>
                  <p className="text-dark-secondary leading-none" style={{ fontSize: '11px', marginTop: '2px' }}>Tipo: {item.type}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="font-medium px-2 py-0.5 rounded-full leading-none" style={{ background: '#d2f0f4', color: '#23545b', fontSize: '11px' }}>
                    {item.category}
                  </span>
                  <p className="font-semibold opacity-70 leading-none" style={{ color: '#334155', fontSize: '11px' }}>a {item.distance}m</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}
