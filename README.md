# Syncboard

A simple yet fully functional web based kanban board

## Tech Stack

| Technology | Role |
|--------------- | --------------- |
| React 19 | Core frontend library |
| Turborepo | Monorepo build ochestration / build caching |
| Mirage.js | Mock API server |
| Biome | Linter / Formatter |
| TanStack Query | Frontend data fetching / caching / server state observer |
| TanStack Router | Client side routing |

## Project Structure

```
syncboard/
├── apps
│   ├── api
│   │   ├── src/
│   └── web                                         -- React frontend
│       ├── src
│       │   ├── components/                         -- UI components
│       │   ├── context/                            -- React context
│       │   ├── data/                               -- mock data
│       │   ├── hooks/                              -- custom React hooks
│       │   ├── layouts/                            -- layout components
│       │   ├── lib/                                -- utility functions
│       │   ├── mirage/                             -- mock API setup
│       │   ├── routes/                             -- client routes
│       │   ├── main.tsx                            -- root renderer
│       │   └── types/                              -- shared types
│       ├── tsconfig.json                           -- typescript configuration
│       └── vite.config.ts                          -- bundler configuration
├── biome.json                                      -- linter / formatter configuration
├── lefthook.yml                                    -- git hooks configuration
└── turbo.json                                      -- turbo tasks configuration
```

## Prerequisites

- npm >= 12.0.2

## Setting Up

Clone the repository locally

```bash
git clone https://github.com/libresoul/syncboard
cd syncboard
npm install
```

## Development

Run the development environment for all workspaces simultaneously:

```bash
npm run dev
```

To run a specific workspace, use the filtered scripts:

```bash
# Run only the web application
npm run dev:web

# Run only the Express API
npm run dev:api
```

## Production Builds

Build all workspaces:

```bash
npm run build
```

Build a specific workspace:

```bash
# Build only the React web application
npm run build:web

# Build only the Express API
npm run build:api
```
