import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("public/trucks");

const trucks = [
  {
    file: "ironhaul-720.png",
    name: "IronHaul 720",
    body: "#9aa4aa",
    cab: "#e9edf0",
    accent: "#e86f1d",
    length: 1.08,
    height: 1.05,
    title: "HEAVY BOX",
    temp: false,
  },
  {
    file: "coldchain-520.png",
    name: "ColdChain 520",
    body: "#e6eaec",
    cab: "#f7f8f8",
    accent: "#e86f1d",
    length: 0.96,
    height: 1,
    title: "REFRIGERATED",
    temp: true,
  },
  {
    file: "urbancarrier-360.png",
    name: "UrbanCarrier 360",
    body: "#a6afb4",
    cab: "#edf0f2",
    accent: "#f09838",
    length: 0.86,
    height: 0.92,
    title: "CITY CARGO",
    temp: false,
  },
];

await fs.mkdir(outDir, { recursive: true });

for (const truck of trucks) {
  const svg = renderTruck(truck);
  const target = path.join(outDir, truck.file);
  await sharp(Buffer.from(svg)).png().toFile(target);
  console.log(`generated ${target}`);
}

function renderTruck(truck) {
  const cargoRight = 855 * truck.length;
  const roofY = 240 - (truck.height - 1) * 28;
  const floorY = 520;
  const rearX = 145;
  const vanX = 294;
  const cabX = cargoRight - 25;
  const frontX = Math.min(1098, cabX + 224);
  const cabTopY = roofY + 28;
  const windshield = `${cabX + 32},${cabTopY + 19} ${cabX + 130},${cabTopY + 2} ${cabX + 176},${cabTopY + 84} ${cabX + 54},${cabTopY + 92}`;
  const bodyColor = truck.body;
  const cabColor = truck.cab;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  <defs>
    <linearGradient id="metal" x1="0" x2="1">
      <stop offset="0" stop-color="${bodyColor}"/>
      <stop offset="0.45" stop-color="#f8fafb" stop-opacity="${truck.temp ? "0.9" : "0.48"}"/>
      <stop offset="1" stop-color="#6f7a82"/>
    </linearGradient>
    <linearGradient id="cab" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${cabColor}"/>
      <stop offset="0.45" stop-color="#c8d0d5"/>
      <stop offset="1" stop-color="#66727b"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f9fdff" stop-opacity="0.86"/>
      <stop offset="0.52" stop-color="#9eb0ba" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#485862"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="34" stdDeviation="26" flood-color="#4b5560" flood-opacity="0.25"/>
    </filter>
    <filter id="hardShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="-16" dy="20" stdDeviation="10" flood-color="#33404a" flood-opacity="0.32"/>
    </filter>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
    <clipPath id="bodyClip">
      <polygon points="${rearX},${roofY + 44} ${vanX},${roofY + 6} ${cabX - 8},${roofY + 30} ${cabX - 38},${floorY - 86} ${rearX + 8},${floorY - 38}"/>
    </clipPath>
  </defs>
  <g opacity="0.78">
    <path d="M96 686 C382 590 754 618 1242 700" fill="none" stroke="#7c8790" stroke-opacity="0.18" stroke-width="34"/>
    <path d="M88 701 C399 604 771 622 1269 711" fill="none" stroke="${truck.accent}" stroke-opacity="0.54" stroke-width="5"/>
    <path d="M108 242 L1180 154" stroke="#6d7880" stroke-opacity="0.18" stroke-width="2"/>
    <path d="M96 648 L1250 574" stroke="#6d7880" stroke-opacity="0.16" stroke-width="2"/>
    <path d="M1060 126 L1308 126" stroke="${truck.accent}" stroke-opacity="0.72" stroke-width="5"/>
  </g>
  <g transform="translate(46 6) rotate(-7 690 430) scale(1.08)" filter="url(#softShadow)">
    <ellipse cx="650" cy="610" rx="530" ry="62" fill="#66727b" opacity="0.16"/>
    <path d="M${rearX + 36} ${floorY - 36} L${frontX - 12} ${floorY - 18} L${frontX - 52} ${floorY + 16} L${rearX - 18} ${floorY + 24} Z" fill="#2d363d" opacity="0.88"/>
    <polygon points="${rearX},${roofY + 44} ${vanX},${roofY + 6} ${cabX - 8},${roofY + 30} ${cabX - 38},${floorY - 86} ${rearX + 8},${floorY - 38}" fill="url(#metal)" stroke="#eff4f6" stroke-opacity="0.36" stroke-width="3"/>
    <g clip-path="url(#bodyClip)">
      <path d="M${rearX + 10} ${roofY + 86} L${cabX - 58} ${roofY + 70}" stroke="#fff" stroke-opacity="0.26" stroke-width="5"/>
      <path d="M${rearX + 28} ${floorY - 112} L${cabX - 64} ${floorY - 128}" stroke="#28323a" stroke-opacity="0.22" stroke-width="8"/>
      <path d="M${vanX + 20} ${roofY + 24} L${vanX + 6} ${floorY - 54}" stroke="#28323a" stroke-opacity="0.22" stroke-width="3"/>
      <path d="M${cabX - 170} ${roofY + 26} L${cabX - 184} ${floorY - 70}" stroke="#28323a" stroke-opacity="0.18" stroke-width="3"/>
      <text x="${vanX + 54}" y="${roofY + 112}" font-family="Arial Narrow, Arial, sans-serif" font-size="42" font-weight="800" letter-spacing="6" fill="#35414a" fill-opacity="${truck.temp ? "0.38" : "0.28"}">${truck.title}</text>
      <rect x="${rearX + 48}" y="${floorY - 93}" width="${cargoRight - 374}" height="15" fill="${truck.accent}" opacity="0.95"/>
      <rect x="${rearX + 54}" y="${roofY + 54}" width="${cargoRight - 430}" height="8" fill="#ffffff" opacity="0.22"/>
      ${
        truck.temp
          ? `<g opacity="0.82">
        <rect x="${vanX + 82}" y="${roofY + 60}" width="94" height="54" rx="8" fill="#ffffff" stroke="#e86f1d" stroke-opacity="0.62"/>
        <circle cx="${vanX + 113}" cy="${roofY + 87}" r="13" fill="none" stroke="#e8eef2" stroke-opacity="0.55" stroke-width="5"/>
        <circle cx="${vanX + 148}" cy="${roofY + 87}" r="13" fill="none" stroke="#e8eef2" stroke-opacity="0.55" stroke-width="5"/>
      </g>`
          : ""
      }
    </g>
    <polygon points="${cabX - 42},${cabTopY + 4} ${cabX + 144},${cabTopY - 22} ${frontX - 12},${cabTopY + 116} ${frontX - 28},${floorY - 48} ${cabX - 74},${floorY - 76}" fill="url(#cab)" stroke="#eef4f6" stroke-opacity="0.42" stroke-width="3"/>
    <polygon points="${windshield}" fill="url(#glass)" stroke="#f5fbff" stroke-opacity="0.52" stroke-width="3"/>
    <polygon points="${cabX + 169},${cabTopY + 96} ${frontX - 25},${cabTopY + 132} ${frontX - 32},${cabTopY + 174} ${cabX + 188},${cabTopY + 157}" fill="#2a343b" opacity="0.86"/>
    <path d="M${cabX - 54} ${floorY - 82} L${frontX - 22} ${floorY - 52}" stroke="${truck.accent}" stroke-width="9" stroke-linecap="round"/>
    <path d="M${frontX - 96} ${floorY - 58} L${frontX - 24} ${floorY - 50}" stroke="#fff7df" stroke-opacity="0.8" stroke-width="8" stroke-linecap="round"/>
    <g filter="url(#hardShadow)">
      ${wheel(rearX + 174, floorY - 22, 67, truck.accent)}
      ${wheel(cargoRight - 178, floorY - 28, 72, truck.accent)}
      ${wheel(frontX - 158, floorY - 22, 75, truck.accent)}
    </g>
    <path d="M${rearX + 18} ${floorY - 44} L${frontX - 42} ${floorY - 34}" fill="none" stroke="#ffffff" stroke-opacity="0.34" stroke-width="6"/>
    <path d="M${frontX - 25} ${cabTopY + 168} L${frontX + 18} ${cabTopY + 184}" stroke="${truck.accent}" stroke-opacity="0.8" stroke-width="5"/>
  </g>
  <g opacity="0.76">
    <text x="92" y="116" font-family="Arial Narrow, Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="8" fill="#3e4a52" fill-opacity="0.42">${truck.name.toUpperCase()}</text>
    <path d="M92 136 L330 136" stroke="${truck.accent}" stroke-opacity="0.8" stroke-width="3"/>
  </g>
</svg>`;
}

function wheel(cx, cy, r, accent) {
  return `
  <g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#1d252b"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 8}" fill="#2e3941" stroke="#5d6972" stroke-width="7"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 31}" fill="#c4ccd1"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 46}" fill="#151a1f"/>
    <g stroke="${accent}" stroke-opacity="0.64" stroke-width="4">
      <path d="M${cx} ${cy - r + 21} L${cx} ${cy + r - 21}"/>
      <path d="M${cx - r + 21} ${cy} L${cx + r - 21} ${cy}"/>
      <path d="M${cx - r * 0.62} ${cy - r * 0.62} L${cx + r * 0.62} ${cy + r * 0.62}"/>
      <path d="M${cx + r * 0.62} ${cy - r * 0.62} L${cx - r * 0.62} ${cy + r * 0.62}"/>
    </g>
  </g>`;
}
