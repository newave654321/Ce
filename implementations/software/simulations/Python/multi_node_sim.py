"""
multi_node_sim.py — Multi-Node Simulation for Ce Protocol

Purpose:
    Simulate multiple nodes exchanging observations and hints to illustrate
    recall propagation and emergent coherence in a minimal, identity-free network.
"""

import random
import time

class Node:
    def __init__(self, node_id=None):
        # Node ID is optional; simulation is identity-free
        self.node_id = node_id
        self.memory = []  # Stores local observations
        self.peers = []   # Other nodes this node can communicate with

    def generate_observation(self, sensor_type, value):
        observation = {
            "type": "observation",
            "sensorType": sensor_type,
            "value": value,
            "timestamp": time.time()
        }
        self.memory.append(observation)
        return observation

    def receive_hint(self, hint):
        # Merge hint into local memory if not already present
        if hint not in self.memory:
            self.memory.append(hint)

    def send_hint_to_peers(self):
        for peer in self.peers:
            for obs in self.memory:
                peer.receive_hint(obs)

def setup_network(node_count=5):
    nodes = [Node() for _ in range(node_count)]
    # Fully connected network for simplicity
    for node in nodes:
        node.peers = [peer for peer in nodes if peer != node]
    return nodes

def run_simulation(node_count=5, steps=10):
    nodes = setup_network(node_count)
    
    # Simulation loop
    for step in range(steps):
        print(f"\n--- Simulation step {step+1} ---")
        # Each node generates a random observation
        for node in nodes:
            obs_value = round(random.uniform(20, 30), 2)
            obs = node.generate_observation("temperature", obs_value)
            print(f"Node generated observation: {obs}")

        # Each node shares hints with peers
        for node in nodes:
            node.send_hint_to_peers()

        # Print current memory of each node to show recall
        for i, node in enumerate(nodes):
            print(f"Node {i} memory: {node.memory}")

        time.sleep(0.5)  # Simulate time passing

if __name__ == "__main__":
    run_simulation(node_count=3, steps=5)
