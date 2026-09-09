import React, { useState } from 'react';
import InteractiveMap from './components/Map/InteractiveMap';
import LocalCard from './components/LocalDetails/LocalCard';

import { Store, X } from 'lucide-react';

function App() {
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [visionMode, setVisionMode] = useState(null);

  return (
    <div className="flex h-screen w-full bg-[#f4f7f6] text-slate-900 overflow-hidden font-sans relative">
      {/* El logo lateral ha sido eliminado completamente por petición del usuario */}

      <div className="absolute inset-0 z-0">
        <InteractiveMap 
          selectedLocal={selectedLocal} 
          onSelectLocal={setSelectedLocal} 
          visionMode={visionMode}
          onCloseVision={() => setVisionMode(null)}
          onSelectVision={(mode) => setVisionMode(mode)}
        />
      </div>
      
      {selectedLocal && (
        <LocalCard 
          local={selectedLocal} 
          onClose={() => setSelectedLocal(null)}
          onShowVision={(type) => setVisionMode(type)}
        />
      )}
    </div>
  );
}

export default App;
