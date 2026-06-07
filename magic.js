// 1. Generate a Random Biotech Cursor on Load
const cursors = ['🧬', '🔬', '🧪', '🧫', '🦠'];
const randomCursor = cursors[Math.floor(Math.random() * cursors.length)];
// Converts the emoji into an image the browser can use as a cursor
const cursorSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="font-size:24px"><text y="24">${randomCursor}</text></svg>`;
document.body.style.cursor = `url('${cursorSVG}'), auto`;


// 2. Create Floating Strawberries and Molecules
const floatingSymbols = ['🍓', '🧬', '🦠', '🧪', '🌿'];
const floatContainer = document.createElement('div');

// Keep the container strictly in the background so it doesn't block clicks!
floatContainer.style.position = 'fixed';
floatContainer.style.top = '0'; floatContainer.style.left = '0';
floatContainer.style.width = '100vw'; floatContainer.style.height = '100vh';
floatContainer.style.pointerEvents = 'none'; 
floatContainer.style.zIndex = '-1'; 
floatContainer.style.overflow = 'hidden';
document.body.appendChild(floatContainer);

// Generate 12 random floating elements
for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.innerText = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
    el.style.position = 'absolute';
    
    // Randomize starting positions and sizes
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = `${Math.random() * 100}vh`;
    el.style.fontSize = `${Math.random() * 20 + 20}px`;
    el.style.opacity = '0.15'; // Keep them slightly transparent
    
    // Randomize the speed of the floating animation
    const speed = Math.random() * 10 + 15;
    el.style.animation = `float ${speed}s linear infinite`;
    
    floatContainer.appendChild(el);
}
