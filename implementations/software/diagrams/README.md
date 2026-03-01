# Ce Software Overview

This diagram illustrates the **software layer** of the Ce protocol, showing how nodes, APIs, messages, and events interact.  
It is **identity-free** and highlights emergent behavior via APIs and events.

---

## Diagram (Mermaid)

```mermaid
flowchart TB
    subgraph NodeA [Node A]
        SWLogicA[Protocol Logic]
        FirmwareA[Firmware]
        SWLogicA --> FirmwareA
    end

    subgraph NodeB [Node B]
        SWLogicB[Protocol Logic]
        FirmwareB[Firmware]
        SWLogicB --> FirmwareB
    end

    %% API layer
    subgraph API [Node API / Interfaces]
        SendObs[sendObservation()]
        QueryState[queryPartialState()]
        RecvHint[receiveHint()]
        ReportHealth[reportHealth()]
    end

    %% Events
    subgraph Events [Events]
        CoherenceUpdate[coherenceUpdate]
        RecallHint[recallHint]
        FailureDetected[failureDetected]
    end

    %% Connections
    SWLogicA --> SendObs
    SWLogicA --> QueryState
    SWLogicA --> RecvHint
    SWLogicA --> ReportHealth

    SendObs --> SWLogicB
    QueryState --> SWLogicB
    RecvHint --> SWLogicB
    ReportHealth --> SWLogicB

    SWLogicA --> CoherenceUpdate
    SWLogicA --> RecallHint
    SWLogicA --> FailureDetected
    SWLogicB --> CoherenceUpdate
    SWLogicB --> RecallHint
    SWLogicB --> FailureDetected
