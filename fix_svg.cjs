const fs = require('fs');
const content = fs.readFileSync('public/plano de ventas-01.svg', 'utf8');

// Match either <path id="..."> or <g id="...">\s*<path .../>
// 1. Match paths with ID
const pathRegex = /<path[^>]*id="((?:local|l)_x5F_[^"]+)"[^>]*d="([^"]+)"/g;
// 2. Match groups with ID that contain a path
const groupRegex = /<g[^>]*id="((?:local|l)_x5F_[^"]+)"[^>]*>[\s\S]*?<path[^>]*d="([^"]+)"/g;

const map = new Map();

let match;
while ((match = pathRegex.exec(content)) !== null) {
  map.set(match[1].replace('_x5F_', '_'), match[2].replace(/\r?\n|\r|\t/g, ' '));
}

while ((match = groupRegex.exec(content)) !== null) {
  map.set(match[1].replace('_x5F_', '_'), match[2].replace(/\r?\n|\r|\t/g, ' '));
}

let out = 'const areas = [\n';
for (const [id, d] of map.entries()) {
  out += `  { id: '${id}', d: "${d}" },\n`;
}

out += `  { id: 'local_sotano_1', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" },
  { id: 'local_sotano_2', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" },
  { id: 'local_sotano_3', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" }
];`;

let comp = fs.readFileSync('src/components/Map/MapSvgOverlay.jsx', 'utf8');
comp = comp.replace(/const areas = \[\s*[\s\S]*?\];/, out);
fs.writeFileSync('src/components/Map/MapSvgOverlay.jsx', comp);

console.log('Fixed MapSvgOverlay.jsx with all areas');
