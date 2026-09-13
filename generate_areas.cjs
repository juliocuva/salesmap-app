const fs = require('fs');
const content = fs.readFileSync('public/plano de ventas-01.svg', 'utf8');

const regex = /<path[^>]*id="((?:local|l)_x5F_[^"]+)"[^>]*d="([^"]+)"/g;
let match;
let out = 'const areas = [\n';
while ((match = regex.exec(content)) !== null) {
  out += `  { id: '${match[1].replace('_x5F_', '_')}', d: "${match[2]}" },\n`;
}

// Add sotanos
out += `  { id: 'local_sotano_1', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" },
  { id: 'local_sotano_2', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" },
  { id: 'local_sotano_3', d: "M0,0 L2822.08,0 L2822.08,1774.98 L0,1774.98 Z" }
];`;

fs.writeFileSync('areas.js', out);
console.log('Done');
