# Ce Hardware Overview

This diagram represents the **hardware layer** of the Ce protocol, showing how nodes, sensors, and firmware interact.  
It is **identity-free** and **protocol-neutral**.

---

## Diagram (Mermaid)

```mermaid
flowchart TB
    subgraph NodeA [Node A]
        ComputeA[Compute]
        MemoryA[Memory]
        CommA[Communication]
        PowerA[Power]
        FirmwareA[Firmware]
        ComputeA --> FirmwareA
        MemoryA --> FirmwareA
        CommA --> FirmwareA
        PowerA --> FirmwareA
    end

    subgraph SensorsA [Sensors]
        EnvA[Environmental Sensor]
        MotionA[Motion Sensor]
        EnergyA[Energy Sensor]
    end

    EnvA --> NodeA
    MotionA --> NodeA
    EnergyA --> NodeA

    subgraph NodeB [Node B]
        ComputeB[Compute]
        MemoryB[Memory]
        CommB[Communication]
        PowerB[Power]
        FirmwareB[Firmware]
        ComputeB --> FirmwareB
        MemoryB --> FirmwareB
        CommB --> FirmwareB
        PowerB --> FirmwareB
    end

    subgraph SensorsB [Sensors]
        EnvB[Environmental Sensor]
        MotionB[Motion Sensor]
        EnergyB[Energy Sensor]
    end

    EnvB --> NodeB
    MotionB --> NodeB
    EnergyB --> NodeB

    %% Node-to-node communication
    NodeA --- NodeB
