const fs = require('fs');
let comp = fs.readFileSync('src/components/Map/MapSvgOverlay.jsx', 'utf8');
comp = comp.replace(/d: "([^"]+)"/g, (match, p1) => {
  return `d: "${p1.replace(/\r?\n|\r|\t/g, ' ')}"`;
});
fs.writeFileSync('src/components/Map/MapSvgOverlay.jsx', comp);
console.log('Fixed newlines');
