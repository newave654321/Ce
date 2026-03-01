# Reference Implementation — Ce Protocol (Software Layer)

## Purpose

The `reference-implementation/` folder provides **executable examples of Ce software logic**.  
These implementations demonstrate how **protocol logic, recall, coherence, and API interactions** can be realized without enforcing a single “correct” approach.

Reference implementations are **educational, illustrative, and testable**, and are not normative unless explicitly marked.

---

## Scope

This folder contains:

- Minimal working examples of nodes
- Example API usage (sendObservation, queryPartialState, etc.)
- Event subscription and handling
- Simulations of recall, coherence, and failure/recovery

It **does not** contain production-grade or optimized code — only clarity and reproducibility are required.

---

## Principles

- **Readable**: Emphasize clarity over optimization  
- **Portable**: Support multiple platforms (ESP32, SBCs, PCs)  
- **Modular**: Each implementation can be understood in isolation  
- **Identity-free**: Nodes operate without permanent IDs  
- **Resilient**: Demonstrates handling of partial failure and intermittent connectivity

---

## Recommended Structure

