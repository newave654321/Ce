/**
 * multiNodeSim.js — Multi-Node Simulation for Ce Protocol (JavaScript)
 *
 * Purpose:
 *   Simulate multiple nodes exchanging observations and hints
 *   to demonstrate recall propagation and emergent coherence.
 *
 * This file is non-normative and intended for simulation and education.
 */

// --------------------------------------------------
// Node definition
// --------------------------------------------------

class Node {
  constructor() {
    this.memory = [];   // Local observations
    this.peers = [];    // Connected nodes
  }

  generateObservation(sensorType, value) {
    const observation = {
      type: "observation",
      sensorType,
      value,
      timestamp: Date.now()
    };
    this.memory.push(observation);
    return observation;
  }

  receiveHint(hint) {
    const exists = this.memory.some(
      obs => JSON.stringify(obs) === JSON.stringify(hint)
    );
    if (!exists) {
      this.memory.push(hint);
    }
  }

  sendHintsToPeers() {
    this.peers.forEach(peer => {
      this.memory.forEach(obs => {
        peer.receiveHint(obs);
      });
    });
  }
}

// --------------------------------------------------
// Network setup
// --------------------------------------------------

function setupNetwork(nodeCount = 5) {
  const nodes = Array.from({ length: nodeCount }, () => new Node());

  // Fully connect nodes (simulation helper)
  nodes.forEach(node => {
    node.peers = nodes.filter(peer => peer !== node);
  });

  return nodes;
}

// --------------------------------------------------
// Simulation loop
// --------------------------------------------------

function runSimulation({ nodeCount = 5, steps = 10, delayMs = 500 } = {}) {
