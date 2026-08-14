# MapleSim Docs
Configure and simulate multi-domain physical systems (mechanical, electrical, hydraulic).

## What Is MapleSim?
MapleSim is Maplesoft's advanced system-level modeling and simulation tool. It applies linear and non-linear mathematical techniques to develop high-fidelity, multi-domain physical models.

## Installation
Download from the [Maplesoft website](https://www.maplesoft.com/products/maplesim/). Available for Windows and Linux (requires a valid Maple installation as its mathematical engine).

## Features

| Feature | Description |
| :--- | :--- |
| **Model Workspace** | Drag-and-drop components to build multi-domain systems |
| **Component Library** | Hundreds of pre-built components (hydraulics, electronics, multibody) |
| **Acausal Modeling** | Connect components based on physical connections, not signal flow |
| **Symbolic Formulation** | Automatically generates clean, efficient parametric equations |
| **3D Visualization** | Animate multibody mechanical systems automatically |
| **Code Generation** | Export high-performance C-code or FMUs for HIL and hardware deployment |

## Workflow

1. Open MapleSim and create a new model workspace
2. Drag and drop physical components from the library pallette
3. Connect components using physical routing ports
4. Define parameters (mass, resistance, fluid viscosity) in the Inspector panel
5. Run the simulation and **analyze results via the plot window or 3D playback**

## When to Use MapleSim

| Task | Use MapleSim? |
| :--- | :--- |
| System-level architecture | Yes (rapidly test physical topologies) |
| Multi-domain simulation | Yes (seamlessly couple mechanical, electrical, and fluid systems) |
| Deriving exact equations | Yes (extracts symbolic equations directly to Maple) |
| Real-time HIL testing | Yes (via high-speed code generation) |
| Detailed FEA stress analysis | No (use specialized finite element software) |
| Control loop design | Yes (integrate plant models with controller blocks) |

## Powertrain Mechanism Setup
For each custom rotational sub-assembly:

1. Drag a 3D Multibody or 1D Rotational component into the subsystem
2. Define the geometric constraints and inertia tensors in the Inspector panel
3. Attach a **Flexible Shaft or Gear Constraint** to link domains
4. Run an initial static analysis to verify the assembly's initial conditions

This ensures the simulation starts from a physically valid equilibrium state.

## Troubleshooting

| Issue | Fix |
| :--- | :--- |
| Model fails to initialize | Check for over-constrained kinematic loops or conflicting initial conditions |
| Simulation runs too slowly | Switch to a stiff solver (e.g., Rosenbrock) or reduce algebraic loops |
| System behavior is unstable | Verify mass/inertia parameters are non-zero; check sign conventions on forces |