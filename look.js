const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

// 1. Create the Brushed Aluminum Texture
function createFoil() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create a complex metallic gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#8e9eab');   // Steel
    grad.addColorStop(0.2, '#eef2f3'); // Bright Shine
    grad.addColorStop(0.4, '#bdc3c7'); // Shadow
    grad.addColorStop(0.6, '#eef2f3'); // Bright Shine
    grad.addColorStop(0.8, '#2c3e50'); // Deep Shadow
    grad.addColorStop(1, '#bdc3c7');   // Final Polish

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Add "Brush Strokes" for realism
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 4) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 20, canvas.height);
        ctx.stroke();
    }
}

// 3. The "Surgical" Scratch Effect
let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;
    
    // Get correct coordinates
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    // 'Surgical' brush: Soft edges for a smoother feel
    const brushGlow = ctx.createRadialGradient(x, y, 0, x, y, 25);
    brushGlow.addColorStop(0, 'rgba(0,0,0,1)');
    brushGlow.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('touchstart', () => isDrawing = true);
canvas.addEventListener('touchmove', scratch);

createFoil();
