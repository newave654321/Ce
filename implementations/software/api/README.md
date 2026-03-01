# Ce Software — API Layer

## Purpose

The `api/` folder defines **interfaces for nodes and external systems to interact with the Ce protocol**.  
APIs expose protocol functionality without revealing internal implementation, ensuring **identity-free and protocol-neutral access**.

This layer allows nodes, devices, or applications to:

- Exchange messages
- Contribute observations
- Query partial network state
- Participate in recall and coherence mechanisms

---

## Scope

APIs in Ce provide:

- Node-to-node communication interfaces
- Node-to-software/management interfaces
- Message formats and event definitions
- Protocol interaction primitives

They **do not implement consensus, recall, or coherence themselves**; that is handled in `software/` and `architecture/`.

---

## API Design Principles

- **Identity-free**: APIs do not require persistent node IDs  
- **Minimal assumptions**: APIs operate under intermittent connectivity and partial views  
- **Composable**: API calls can be combined to build higher-level software  
- **Non-normative vs Normative**:  
  - Normative: required interface methods and expected responses  
  - Non-normative: examples or experimental calls  

---

## Folder Content

### 1. Node Interfaces

Defines functions that nodes expose for interacting with neighbors:

