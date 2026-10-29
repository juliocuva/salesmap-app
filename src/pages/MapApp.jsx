import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import InteractiveMap from '../components/Map/InteractiveMap';
import LocalCard from '../components/LocalDetails/LocalCard';
import { getProject } from '../projects';

function normalizeSheetUrl(url) {
  if (!url) return '';
  // Si es un enlace de Google Sheets (sea de edición /edit o de export /export),
  // convertirlo al endpoint de Google Visualization API (/gviz/tq?tqx=out:csv)
  // que soporta CORS directamente en navegadores sin redirecciones problemáticas.
  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetMatch) {
    const id = sheetMatch[1];
    return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv`;
  }
  return url;
}

function MapApp() {
  const { projectId } = useParams();
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [visionMode, setVisionMode] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no hay projectId en la URL, asumimos bahia guacamayas como default
    const activeProject = getProject(projectId || 'bahiaguacamayas');
    if (!activeProject) {
      setLoading(false);
      return;
    }
    
    if (activeProject.config && activeProject.config.sheetUrl) {
      const csvUrl = normalizeSheetUrl(activeProject.config.sheetUrl);
      console.log("[SalesMap] Sincronizando con Google Sheet:", csvUrl);

      fetch(csvUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          return res.text();
        })
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              // Mapa base a partir de los datos locales para preservar pisos, frentes, terrazas, etc.
              const localMap = new Map();
              (activeProject.data || []).forEach((item) => {
                localMap.set(item.id, { ...item });
              });

              results.data
                .filter((row) => row.id)
                .forEach((row) => {
                  const id = String(row.id).trim();
                  const existing = localMap.get(id) || { id };

                  const status = (row.estado || row.status)
                    ? String(row.estado || row.status).toLowerCase().trim()
                    : (existing.status || 'disponible');
                  const area = !isNaN(parseFloat(row.area))
                    ? parseFloat(row.area)
                    : existing.area;
                  const price = (row.precio || row.price)
                    ? parseInt(row.precio || row.price)
                    : existing.price;
                  const name = (row.nombre || row.name)
                    ? String(row.nombre || row.name).trim()
                    : (existing.name || id);
                  const delivery = (row.entrega || row.delivery) !== undefined
                    ? String(row.entrega || row.delivery).trim()
                    : existing.delivery;
                  const logo = (row.logo || row.icono || row.icon)
                    ? String(row.logo || row.icono || row.icon).trim()
                    : existing.logo;

                  localMap.set(id, {
                    ...existing,
                    id,
                    name,
                    area,
                    price,
                    status,
                    delivery,
                    logo
                  });

                  // Aliasing para local_30 si en el sheet está como local_30A o local_30a
                  if (id === 'local_30A' || id === 'local_30a') {
                    if (localMap.has('local_30')) {
                      const l30 = localMap.get('local_30');
                      localMap.set('local_30', {
                        ...l30,
                        status,
                        delivery,
                        area: area || l30.area,
                        price: price || l30.price
                      });
                    }
                  }
                });

              const mergedData = Array.from(localMap.values());
              const soldCount = mergedData.filter((l) => l.status === 'vendido').length;
              console.log(`[SalesMap] Google Sheet cargado con éxito: ${mergedData.length} locales totales (${soldCount} vendidos).`);
              
              setProjectData({ ...activeProject, data: mergedData });
              setLoading(false);
            },
            error: (parseErr) => {
              console.error("[SalesMap] Error al parsear CSV:", parseErr);
              setProjectData(activeProject);
              setLoading(false);
            }
          });
        })
        .catch((fetchErr) => {
          console.warn("[SalesMap] No se pudo descargar el Google Sheet en vivo, usando datos de respaldo:", fetchErr);
          setProjectData(activeProject);
          setLoading(false);
        });
    } else {
      setProjectData(activeProject);
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#171717]">Cargando...</div>;
  }

  if (!projectData) {
    return <div className="flex h-screen items-center justify-center bg-[#171717]">Proyecto no encontrado</div>;
  }

  return (
    <div className="flex h-screen w-full bg-[#171717] text-slate-900 overflow-hidden font-sans relative">
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
