import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InteractiveMap from '../components/Map/InteractiveMap';
import LocalCard from '../components/LocalDetails/LocalCard';
import { getProject } from '../projects';

function MapApp() {
  const { projectId } = useParams();
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [visionMode, setVisionMode] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no hay projectId en la URL, asumimos bahia guacamayas como default
    // O si pasan algo especifíco, lo buscamos
    const activeProject = getProject(projectId || 'bahiaguacamayas');
    setProjectData(activeProject);
    setLoading(false);
  }, [projectId]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#f4f7f6]">Cargando...</div>;
  }

  if (!projectData) {
    return <div className="flex h-screen items-center justify-center bg-[#f4f7f6]">Proyecto no encontrado</div>;
  }

  return (
    <div className="flex h-screen w-full bg-[#f4f7f6] text-slate-900 overflow-hidden font-sans relative">
      <div className="absolute inset-0 z-0">
        <InteractiveMap 
          selectedLocal={selectedLocal} 
          onSelectLocal={setSelectedLocal} 
          visionMode={visionMode}
          onCloseVision={() => setVisionMode(null)}
          onSelectVision={(mode) => setVisionMode(mode)}
          projectData={projectData}
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

export default MapApp;
