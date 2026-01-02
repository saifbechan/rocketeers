# Rocketeers 🚀

Welcome to the source code for **Rocketeers**! This project serves as a showcase of a **genetic algorithm simulation** called "Rocketeers."

## 🌟 Overview

The core of this website is a simulation where a population of "Rocketeers" (autonomous agents) learns to navigate a hazardous environment to reach a target planet. Over multiple generations, the rockets evolve, improving their paths and avoidance strategies through a genetic algorithm.

### Key Features
- **Genetic Algorithm**: Implementation of evolutionary concepts including selection, crossover, and mutation.
- **Visual Simulation**: Real-time rendering of the agents, obstacles, and targets using **p5.js**.
- **Adaptive Difficulty**: The simulation runs for longer durations as generations progress, allowing specialized paths to emerge.
- **Modern Web Stack**: Built with performance and type-safety in mind using Next.js and TypeScript.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Graphics**: [p5.js](https://p5js.org/)
- **Testing**:
  - [Jest](https://jestjs.io/) (Unit testing)
  - [Playwright](https://playwright.dev/) (End-to-End testing)
- **Code Quality**: ESLint, Prettier, Husky, Commitlint

---

## 🏗 System Architecture

The application is structured around the Next.js App Router, with the simulation logic encapsulated in a dedicated component tree.

### 1. Application Entry (`app/`)
- **`page.tsx`**: The main entry point. It renders the full-screen simulation (`<Rocketeers />`) and the overlay functionality.
- **`layout.tsx`**: handles the global layout structure.

### 2. The Simulation Engine (`components/Rocketeers/`)
This is where the magic happens. The simulation is decoupled from React's render cycle using a `ref` within a simplified React wrapper, allowing `p5.js` to handle the high-frequency rendering loop efficiently.

- **`index.tsx`**: Initializes the p5 instance and the game loop. It handles the `setup()` (loading assets, initializing the world) and `draw()` (running the simulation step-by-step).
- **`Entities/`**:
  - **`Mission.ts`**: The main controller class. It manages the population of rocketeers and evaluate their performance at the end of each generation.
  - **`Rocketeer.ts`**: Represents an individual agent with its own DNA (instructions) and physics properties (velocity, acceleration).
  - **`Drawable/`**: Contains classes for rendering simulation elements like Planets and Obstacles.
- **`Helpers/`**: Configuration constants (`Config.ts`) and utility functions.

**How it works:**
1.  **Initialization**: 100 Rocketeers are spawned.
2.  **Runtime**: In every frame, each Rocketeer moves based on its DNA instructions.
3.  **Evaluation**: When the step limit is reached, the mission stops. Rocketeers are evaluated based on how close they got to the target and if they crashed.
4.  **Evolution**: A new generation is created. Successful genes are passed down with slight mutations.

### 3. Contact & UI (`components/Contact/`)
- A simple, accessible overlay component that displays social links (GitHub, LinkedIn) relative to the simulation canvas.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v24 recommended, see `.nvmrc`)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the simulation.

### building for Production

```bash
npm run build
npm start
```

---

## 🧪 Testing & Quality

We maintain high code quality standards through automated checks.

- **Unit Tests**: `npm test`
- **E2E Tests**: `npm run test:e2e`
- **Linting**: `npm run lint`
- **Type Checking**: `npm run type-check`

---

## 📂 Project Structure

```
├── app/                 # Next.js App Router pages
├── components/          
│   ├── Contact/         # UI Overlay components
│   └── Rocketeers/      # Genetic Algorithm & p5.js logic
│       ├── Entities/    # Game objects (Mission, Rocketeer, etc.)
│       └── Helpers/     # Config and utilities
├── public/              # Static assets (images, icons)
├── __test__/            # Global test setup
└── ...config files      # TS, Jest, Tailwind, etc.
```

## 📜 Credits

Inspiration for the genetic algorithm implementation comes from [The Coding Train](https://thecodingtrain.com/) by Daniel Shiffman.
