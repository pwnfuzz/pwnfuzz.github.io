// Quick script to generate OG image from HTML template
// Run with: node generate-og-image.js

const fs = require('fs');
const path = require('path');

console.log('To generate your OG image:');
console.log('1. Open og-image-template.html in Chrome');
console.log('2. Press F12 to open DevTools');
console.log('3. Click the device toolbar icon (or press Ctrl+Shift+M)');
console.log('4. Set dimensions to: 1200 x 630');
console.log('5. Right-click the page > "Capture screenshot"');
console.log('6. Save as: public/og-image.png');
console.log('\nDone! Your OG image will be ready.');
