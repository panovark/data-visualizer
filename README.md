# Trivia Data Visualization Tool

A Vite + React 19 dashboard that fetches 50 trivia questions from the Open Trivia DB API, cleans the data, and visualizes categories and difficulty levels with interactive filters, charts, and a persistent theme toggle.

## 📚 About This Project

This project demonstrates modern frontend practices while staying framework-light:

- React Query handles data fetching, caching, and retry logic for the trivia API.
- Derived statistics (category, difficulty, totals) live in a dedicated `useTriviaFilters` hook for easy reuse.
- Recharts powers the bar and pie charts, wrapped in a custom `ChartContainer` that injects theme-aware styles.
- Tailwind CSS v4 (via the official Vite plugin), Radix UI primitives, and lucide-react icons provide a polished, responsive UI.
- A resilient UX is ensured through error boundaries, skeleton loading states, and a ThemeProvider that syncs system preference with local storage.

## 🏗️ Project Structure

```
data-visualizer/
├── src/
│   ├── api/               # Fetch helpers (Open Trivia DB)
│   ├── components/        # Charts, filters, theming, shared UI
│   ├── hooks/             # useTriviaFilters.jsx derived-state logic
│   ├── lib/               # shadcn utility helpers
│   ├── theme/             # Theme loading utility
│   ├── trivia/            # Text decoding and aggregation helpers
│   ├── __tests__/         # Vitest suites for hooks and utilities
│   ├── index.css          # Global CSS styles
│   └── main.jsx           # Root component
├── index.html
├── package.json
├── vite.config.js
└── ...
```

## 📊 Core Features

- Interactive category selector that narrows every visualization in sync.
- Category and difficulty charts with accessible tooltips, legends, and responsive layouts.
- Category list view that sorts the most common topics and highlights counts.
- Dark/light/system theme selector backed by local storage and `prefers-color-scheme`.
- Friendly loading, empty, and error states to keep the experience smooth.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone the repository and move into the folder:

   ```bash
   git clone https://github.com/panovark/data-visualizer.git
   cd data-visualizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the dev server (Vite defaults to `http://localhost:5173`):

```bash
npm run dev
```

## 🧪 Testing

Vitest is configured with both DOM and UI runners:

```bash
npm test         # Run unit tests in watch mode
npm run test:ui  # Launch Vitest UI
npm run coverage # Generate coverage report
```

## 🧹 Code Quality

```bash
npm run lint    # ESLint with React + TanStack Query presets
npm run format  # Prettier over src/**/*.{js,jsx,css,html}
```

## 📦 Building for Production

```bash
npm run build   # Generate optimized assets
npm run preview # Preview the production build locally
```

## 🛠️ Technologies Used

### Frontend

- **React 19** with Strict Mode and Suspense-ready patterns.
- **TanStack Query** for API state management and caching.
- **Recharts** for creating charts to visualize the data.
- **Tailwind CSS v4** (via `@tailwindcss/vite`) with `clsx` + `tailwind-merge` helpers.
- **shadcn/ui** components (Select, Card, etc.) built on Radix primitives, paired with **lucide-react** icons as a perfect combination with **Recharts** to improve the quality of UI.

### Tooling & Testing

- **Vite 7** for fast dev builds and previews.
- **Vitest** + **@vitest/coverage-v8**, **@testing-library/react**, and **happy-dom** for unit testing hooks, coverage, and utilities.
- **ESLint** + **Prettier** to keep the codebase tidy.

## 📝 License

This project is distributed under the **ISC License**. Feel free to use, modify, and share it in accordance with that license.
