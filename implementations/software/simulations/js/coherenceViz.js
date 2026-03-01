/**
 * coherenceViz.js
 *
 * Visualization of Ce coherence field.
 * Nodes = stateful dots.
 * Blue flash = node aligned with network.
 * Lines = aligned nodes interacting.
 * Numeric display = real-time coherence value.
 * Canvas click = disturbance (noise + state perturbation).
 */

let canvas, ctx, statusEl, coherenceValueEl;
let nodes = [];
let animationRunning = false;
let coherenceLevel = 0;

// -------------------------
// Node definition
// -------------------------
function createNode(x, y) {
  return {
    x,
    y,
    phase: Math.random() * Math.PI * 2,
    noise: 6 + Math.random() * 4,
    state: Math.random(),
    recallPulse: 0
  };
}

// -------------------------
// Initialization
// -------------------------
function init(canvasId = "coherenceCanvas", statusId = "status", valueId = "coherenceValue") {
  canvas = document.getElementById(canvasId);
  ctx = canvas.getContext("2d");
  statusEl = document.getElementById(statusId);
  coherenceValueEl = document.getElementById(valueId);

  canvas.addEventListener("click", () => {
    nodes.forEach(node => {
      node.noise += 2; // visual disturbance
      node.state += (Math.random() - 0.5) * 0.3; // perturb state
      node.state = Math.max(0, Math.min(1, node.state));
    });
    if (statusEl) statusEl.textContent = "External disturbance introduced!";
  });
}

// -------------------------
// Node creation
// -------------------------
function createNodes(count = 6) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push(
      createNode(
        50 + Math.random() * (canvas.width - 100),
        40 + Math.random() * (canvas.height - 80)
      )
    );
  }
}

// -------------------------
// Compute average and aligned nodes
// -------------------------
function networkAverage() {
  return nodes.reduce((acc, n) => acc + n.state, 0) / nodes.length;
}

// -------------------------
// Update coherence
// -------------------------
function updateCoherence() {
  const avg = networkAverage();
  let alignedCount = 0;

  nodes.forEach(node => {
    const threshold = 0.1;
    if (Math.abs(node.state - avg) < threshold) {
      alignedCount++;
      node.recallPulse = 1; // trigger flash
    }
  });

  coherenceLevel = alignedCount / nodes.length;

  if (statusEl) {
    if (coherenceLevel < 0.3) statusEl.textContent = "Coherence not yet achieved.";
    else if (coherenceLevel < 0.7) statusEl.textContent = "Coherence forming...";
    else statusEl.textContent = "Coherence achieved.";
  }

  if (coherenceValueEl) {
    coherenceValueEl.textContent = `Coherence: ${coherenceLevel.toFixed(2)}`;
  }
}

// -------------------------
// Update node states (agreement)
function updateNodeStates() {
  const avg = networkAverage();
  nodes.forEach(node => {
    node.state += (avg - node.state) * 0.02;
    node.state += (Math.random() - 0.5) * 0.01;
    node.state = Math.max(0, Math.min(1, node.state));
  });
}

// -------------------------
// Draw nodes and lines
// -------------------------
function drawNodes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw lines between aligned nodes
  const threshold = 0.1;
  const alignedNodes = nodes.filter(node => Math.abs(node.state - networkAverage()) < threshold);
  ctx.strokeStyle = "rgba(0,150,255,0.25)";
  ctx.lineWidth = 1;
  for (let i = 0; i < alignedNodes.length; i++) {
    for (let j = i + 1; j < alignedNodes.length; j++) {
      const n1 = alignedNodes[i];
      const n2 = alignedNodes[j];

      // Use current jittered positions
      const jitterX1 = Math.cos(n1.phase) * n1.noise;
      const jitterY1 = Math.sin(n1.phase) * n1.noise;
      const jitterX2 = Math.cos(n2.phase) * n2.noise;
      const jitterY2 = Math.sin(n2.phase) * n2.noise;

      ctx.beginPath();
      ctx.moveTo(n1.x + jitterX1, n1.y + jitterY1);
      ctx.lineTo(n2.x + jitterX2, n2.y + jitterY2);
      ctx.stroke();
    }
  }

  // Draw nodes
  nodes.forEach(node => {
    node.phase += 0.05;

    const syncOffset = coherenceLevel * 0.5;
    const jitterX = Math.cos(node.phase + syncOffset) * node.noise;
    const jitterY = Math.sin(node.phase + syncOffset) * node.noise;

    // Base dot
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(node.x + jitterX, node.y + jitterY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Recall flash
    if (node.recallPulse > 0) {
      const alpha = Math.min(0.8, node.recallPulse);
      ctx.fillStyle = `rgba(0,150,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(node.x + jitterX, node.y + jitterY, 12, 0, Math.PI * 2);
      ctx.fill();

      node.recallPulse *= 0.9;
      if (node.recallPulse < 0.01) node.recallPulse = 0;
    }
  });
}

// -------------------------
// Animation loop
// -------------------------
function animationLoop() {
  if (!animationRunning) return;

  nodes.forEach(node => {
    node.noise = Math.max(1.5, node.noise - coherenceLevel * 0.02);
  });

  updateNodeStates();
  updateCoherence();
  drawNodes();

  requestAnimationFrame(animationLoop);
}

// -------------------------
// Public function
// -------------------------
export function runCoherenceSimulation({ nodeCount = 6 } = {}) {
  if (!canvas || !ctx) init();

  createNodes(nodeCount);
  coherenceLevel = 0;
  animationRunning = true;
  animationLoop();
}


