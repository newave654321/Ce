"""
recall_test.py — Recall Propagation Test for Ce Protocol

Purpose:
    Test the propagation of observations (recall hints) across multiple nodes
    to verify that recall works as intended in a minimal identity-free network.
"""

import random
import time
from multi_node_sim import Node, setup_network

def test_recall_propagation(node_count=4, steps=5):
    nodes = setup_network(node_count)
    
    print("\n=== Recall Propagation Test ===")
    
    # Step 0: Initial observation only on node 0
    initial_obs = nodes[0].generate_observation("temperature", 25.0)
    print(f"Initial observation generated on Node 0: {initial_obs}")
    
    for step in range(1, steps+1):
        print(f"\n--- Simulation step {step} ---")
        
        # Randomly choose nodes to generate new observations
        for node in nodes:
            if random.random() < 0.3:  # 30% chance to generate an observation
                value = round(random.uniform(20, 30), 2)
                obs = node.generate_observation("temperature", value)
                print(f"Node generated observation: {obs}")
        
        # Propagate hints among peers
        for node in nodes:
            node.send_hint_to_peers()
        
        # Display memory of each node
        for i, node in enumerate(nodes):
            print(f"Node {i} memory ({len(node.memory)} obs):")
            for obs in node.memory:
                print(f"  {obs}")
        
        time.sleep(0.3)

if __name__ == "__main__":
    test_recall_propagation(node_count=4, steps=5)
