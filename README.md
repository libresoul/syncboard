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
| Scalar | API documentation / client |

## Project Structure

```
syncboard/
├── apps
│   ├── api
│   │   ├── src
│   │   │   ├── config
│   │   │   │   ├── api.config.ts                   -- Express zod API config
│   │   │   │   ├── db.config.ts                    -- database configuration
│   │   │   │   └── env.ts                          -- environment variable validation
│   │   │   ├── controllers/                        -- request handlers
│   │   │   ├── db
│   │   │   │   ├── client.ts                       -- MongoDB client and connection
│   │   │   │   └── utils.ts                        -- database utilities
│   │   │   ├── docs/index.ts                       -- API documentation config
│   │   │   ├── endpoints/                          -- API endpoint definitions
│   │   │   ├── index.ts                            -- application entrypoint
│   │   │   ├── middleware/                         -- API middleware
│   │   │   ├── models/                             -- database models
│   │   │   ├── routing.ts                          -- Express zod API route map
│   │   │   └── utils/logger.ts                     -- Pino logger
│   │   ├── .env.example                            -- API environment template
│   │   └── tsconfig.json                           -- TypeScript configuration
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
├── packages
│   └── shared
│       └── src
│           ├── data                                -- Shared mock data
│           ├── index.ts
│           ├── schemas                             -- Shared schemas
│           └── types                               -- Shared types
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

The Express.js API requires multiple environment variables to function.
Create a `.env` environment file from the provided template:

```bash
cp apps/api/.env.example apps/api/.env
```

Update `apps/api/.env` with the values for your MongoDB instance:

```dotenv
DATABASE_URL=<your connection string>
DB_NAME=syncboard
PORT=3000
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
