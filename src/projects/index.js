import { config as bgConfig } from './bahiaguacamayas/config';
import { localsData as bgData } from './bahiaguacamayas/data';
import { svgPaths as bgSvg } from './bahiaguacamayas/svgPaths';

export const projects = {
  'bahiaguacamayas': {
    config: bgConfig,
    data: bgData,
    svg: bgSvg,
    // You can also add custom components here, like a specific Cameras component if needed.
  }
};

// Helper to get a project
export const getProject = (projectId) => {
  return projects[projectId] || null;
};
