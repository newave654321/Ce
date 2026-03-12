# DevNode Interface

This folder contains the **interface layer** of the DevNode expressive node (any device that is for communication purposes for humans) system for the **Ce System** and **WOA (Web of Agreement)**.  

Ce – Web of Agreement (WOA)

Ce is an experimental protocol exploring whether network coordination can emerge from agreement structures rather than algorithms, feeds, or moderation systems.

Instead of ranking or amplifying content, Ce structures interaction through a small set of query prompts that define how participants engage across nodes.

The goal is to create a network where interaction occurs on a level playing field, and value emerges through contribution rather than algorithmic visibility.

Current Status

The Ce network is live with a limited number of active nodes.

These nodes are fully functional and operating under the agreement protocol.

This repository contains a stripped-down, sandboxed implementation designed specifically for developers who want to explore the mechanics of the system without the complexity of the full network.

Core Interaction Prompts

Ce interaction occurs through five prompts:

Request

One-way prompt used to express a need.

Examples:

free food

childcare assistance

transportation help

No commerce occurs through this prompt.

Listen

One-way prompt used to offer what you have available.

Examples:

women's shoes size 8.5

extra garden vegetables

tutoring availability

Sharing may occur, but commerce is not required.

Shop

Two-way prompt used when searching for products or services.

Examples:

cookies

bicycles

laptop repair

Commerce may occur through this prompt.

View

Two-way prompt used for visual media.

Examples:

films

videos

art

Commerce may occur through media access or licensing.

Discover

Two-way prompt used to search for people, creators, or participants.

Examples:

trap rappers

local artists

robotics engineers

Commerce may emerge through collaboration or connection.

Interaction Model

Prompts fall into two categories:

One-Way Prompts

Request

Listen

These prompts are non-commercial and enable needs and offerings to surface across the network.

Two-Way Prompts

Shop

View

Discover

These prompts allow commerce and collaboration.

Design Principles

Ce is built around several core ideas:

No algorithmic ranking

No amplification systems

No feeds

No behavioral manipulation

Interaction defined by prompt structure

Value emerges through participation

The system explores whether coherent coordination can arise from agreement rather than algorithmic control.

Repository Scope

This repository contains a sandbox implementation of the Ce protocol.

It is intentionally simplified to allow developers to:

inspect the core interaction structure

experiment with node behavior

build interfaces or expressive layers

test alternative implementations

The production node architecture used in the live network is not fully represented here.

It provides the HTML/JS front-end for interacting with nodes, sending intents, and visualizing node communication.

---

## 🖥️ Contents

## 🚀 Launch Instructions

### Option 1: Open in Browser (Quick Test)
1. Double-click `start-devnode.bat`:
   ```bat
2. Download node.js
3.  start "" "index.html"
   In the address bar type: http://localhost:3000/index.html
- `index.html` — Main entry point for the interface.
- # DevNode Interface

This folder contains the **interface layer** of the DevNode expressive node (any device that is for communication purposes for humans) system for the **Ce System** and **WOA (Web of Agreement)**.  

It provides the HTML/JS front-end for interacting with nodes, sending intents, and visualizing node communication.

---

## 🖥️ Contents

## 🚀 Launch Instructions

### Option 1: Open in Browser (Quick Test)
1. Double-click `index.html` or use the provided `start-devnode.bat`:
   ```bat
   start "" "index.html"
- `index.html` — Main entry point for the interface.  
- `shared.html` - It is the dedicated viewport for the ce_content data structure.
- `Profile.html` - It is the dedicated page to add or adjust user profile.
- `assets/` — Images, stylesheets, and other static resources.  
- `js/` — JavaScript files handling communication, node rendering, and events.  
- `css/` — Stylesheets for the interface.  

---

- `assets/` — Images, stylesheets, and other static resources.  
- `js/` — JavaScript files handling communication, node rendering, and events.  
- `css/` — Stylesheets for the interface.  

---




