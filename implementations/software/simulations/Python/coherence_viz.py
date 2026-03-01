"""
coherence_viz.py — Coherence Visualization for Ce Protocol

Purpose:
    Visualize coherence as an emergent field condition across nodes.
    Coherence is measured as shared recall overlap over time,
    not as agreement or consensus.

Interpretation:
    High coherence = nodes share overlapping memory
    Low coherence = fragmented or isolated memory
"""

import time
import random
import matplotlib.pyplot as plt
from multi_node_sim import setup_network

def coherence_metric(nodes):
    """
    Compute coherence as average pairwise memory overlap.
    Returns value in range [0, 1].
    """
    if len(nodes) < 2:
        return 1.0

    overlaps = []
    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            mem_i = set(str(obs) for obs in nodes[i].memory)
            mem_j = set(str(obs) for obs in nodes[j].memory)
            if mem_i or mem_j:
                overlap = len(mem_i & mem_j) / len(mem_i | mem_j)
                overlaps.append(overlap)

    return sum(overlaps) / len(overlaps) if overlaps else 0.0


def run_coherence_simulation(node_count=5, steps=20):
    nodes = setup_network(node_count)
    coherence_values = []

    for step in range(steps):
        # Random observation generation
        for node in nodes:
            if random.random() < 0.4:
                node.generate_observation(
                    sensor_type="temperature",
                    value=round(random.uniform(20, 30), 2)
                )

        # Hint propagation
        for node in nodes:
            node.send_hint_to_peers()

        # Measure coherence
        c = coherence_metric(nodes)
        coherence_values.append(c)
        print(f"Step {step+1}: Coherence = {round(c, 3)}")

        time.sleep(0.2)

    return coherence_values


def plot_coherence(coherence_values):
    plt.figure()
    plt.plot(coherence_values)
    plt.xlabel("Time Step")
    plt.ylabel("Coherence")
    plt.title("Emergent Coherence Over Time")
    plt.ylim(0, 1)
    plt.show()


if __name__ == "__main__":
    values = run_coherence_simulation(node_count=5, steps=25)
    plot_coherence(values)
