/**
 * recallTest.js — Recall Propagation Test for Ce Protocol (JavaScript)
 *
 * Purpose:
 *   Test recall propagation across nodes by seeding an observation
 *   in one node and observing how it spreads through hint exchange.
 *
 * Non-normative. Identity-free.
 */

import { setupNetwork } from "./multiNodeSim.js";

// --------------------------------------------------
// Recall propagation test
// --------------------------------------------------

function recallPropagationTest({
  nodeCount = 4,
  steps = 5,
  delayMs = 400
} = {}) {
  const nodes = setupNetwork(nodeCount);

  console.log("\n=== Recall Propagation Test ===");

  // Seed initial observation in first node
  const initialObservation = {
    type: "observation",
    sensorType: "temperature",
    value: 25.0,
    timestamp: Date.now()
  };

  nodes[0].memory.push(initialObservation);
  console.log("Initial observation seeded in Node 0:", initialObservation);

  let step = 0;

  function stepSimulation() {
    step += 1;
    console.log(`\n--- Step ${step} ---`);

    // Random local observations
    nodes.forEach(node => {
      if (Math.random() < 0.3) {
        const value = Number((20 + Math.random() * 10).toFixed(2));
        const obs = node.generateObservation("temperature", value);
        console.log("Generated observation:", obs);
      }
    });

    // Propagate recall hints
    nodes.forEach(node => node.sendHintsToPeers());

    // Display memory state
    nodes.forEach((node, index) => {
      console.log(
        `Node ${index} memory (${node.memory.length} obs):`,
        node.memory
      );
    });

    if (step < steps) {
      setTimeout(stepSimulation, delayMs);
    }
  }

  stepSimulation();
}

// --------------------------------------------------
// Entry point
// --------------------------------------------------

if (typeof window === "undefined") {
  recallPropagationTest({ nodeCount: 4, steps: 5 });
}

// For browser use, call recallPropagationTest() manually
export { recallPropagationTest };
