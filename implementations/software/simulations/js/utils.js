/**
 * utils.js — Shared Utilities for Ce JavaScript Simulations
 *
 * Purpose:
 *   Provide minimal helper utilities for simulations without embedding
 *   protocol meaning, identity, or architectural assumptions.
 */

// --------------------------------------------------
// Time utilities
// --------------------------------------------------

function currentTimestamp() {
  return Date.now();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --------------------------------------------------
// Randomization utilities
// --------------------------------------------------

function seedRandom(seed) {
  // Simple deterministic RNG (LCG) for reproducibility
  let value = seed % 2147483647;
  return function () {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function randomChance(probability = 0.5) {
  return Math.random() < probability;
}

function randomValue(min = 0, max = 1, precision = 2) {
  const value = min + Math.random() * (max - min);
  return Number(value.toFixed(precision));
}

// --------------------------------------------------
// Logging utilities
// --------------------------------------------------

function log(...args) {
  console.log("[ce-sim]", ...args);
}

function warn(...args) {
  console.warn("[ce-sim]", ...args);
}

// --------------------------------------------------
// Memory utilities
// --------------------------------------------------

function normalizeObservation(observation) {
  return JSON.stringify(
    Object.keys(observation)
      .sort()
      .reduce((obj, key) => {
        obj[key] = observation[key];
        return obj;
      }, {})
  );
}

function mergeMemory(localMemory, incomingMemory) {
  const seen = new Set(localMemory.map(normalizeObservation));
  incomingMemory.forEach(obs => {
    const key = normalizeObservation(obs);
    if (!seen.has(key)) {
      localMemory.push(obs);
      seen.add(key);
    }
  });
}

// --------------------------------------------------
// Network utilities (simulation-only)
// --------------------------------------------------

function fullyConnect(nodes) {
  nodes.forEach(node => {
    node.peers = nodes.filter(peer => peer !== node);
  });
}

// --------------------------------------------------
// Diagnostics
// --------------------------------------------------

function printNodeMemory(nodes) {
  nodes.forEach((node, index) => {
    console.log(
      `Node ${index} memory (${node.memory.length} entries):`,
      node.memory
    );
  });
}

// --------------------------------------------------
// Exports
// --------------------------------------------------

export {
  currentTimestamp,
  sleep,
  seedRandom,
  randomChance,
  randomValue,
  log,
  warn,
  normalizeObservation,
  mergeMemory,
  fullyConnect,
  printNodeMemory
};
