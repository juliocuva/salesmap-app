import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
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
    const activeProject = getProject(projectId || 'bahiaguacamayas');
    
    if (activeProject && activeProject.config.sheetUrl) {
      // Descargar desde Google Sheets CSV
      Papa.parse(activeProject.config.sheetUrl, {
        download: true,
        header: true,
        complete: (results) => {
          // Transformar la fila de CSV al formato necesario
          const sheetData = results.data
            .filter(row => row.id) // Ignorar filas vacías
            .map(row => ({
              id: row.id ? row.id.trim() : null,
              name: (row.nombre || row.name) ? (row.nombre || row.name).trim() : '',
              area: parseFloat(row.area) || 0,
              price: (row.precio || row.price) ? parseInt(row.precio || row.price) : null,
              status: (row.estado || row.status) ? (row.estado || row.status).toLowerCase().trim() : 'disponible',
              delivery: (row.entrega || row.delivery) ? (row.entrega || row.delivery).trim() : ''
            }));
          
          setProjectData({ ...activeProject, data: sheetData });
          setLoading(false);
        },
        error: (err) => {
          console.error("Error cargando CSV:", err);
          setProjectData(activeProject); // Fallback a los datos locales
          setLoading(false);
        }
      });
    } else {
      // Usar los datos locales estáticos si no hay sheetUrl
      setProjectData(activeProject);
      setLoading(false);
    }
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
