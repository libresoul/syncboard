# Syncboard

A simple yet fully functional web based kanban board

## Tech Stack

| Technology | Role |
|--------------- | --------------- |
| React 19 | Core frontend library |
| Express.js | API framework |
| MongoDB | Database solution |
| BetterAuth | Authentication framework |
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
│   │   │   │   ├── auth.config.ts                   -- BetterAuth configuration
│   │   │   │   ├── db.config.ts                    -- database configuration
│   │   │   │   └── env.ts                          -- environment variable validation
│   │   │   ├── controllers/                        -- request handlers
│   │   │   ├── db
│   │   │   │   ├── client.ts                       -- MongoDB client and connection
│   │   │   │   └── utils.ts                        -- database utilities
│   │   │   ├── docs/index.ts                       -- API documentation config
│   │   │   ├── endpoints/                          -- API endpoint definitions
│   │   │   ├── factories/authed.factory.ts         -- authenticated endpoint factory
│   │   │   ├── index.ts                            -- application entrypoint
│   │   │   ├── middleware/                         -- authentication, CORS, and request logging
│   │   │   ├── models/                             -- database models
│   │   │   ├── routing.ts                          -- Express zod API route map
│   │   │   └── utils/logger.ts                     -- Pino logger
│   │   ├── .env.example                            -- API environment template
│   │   └── tsconfig.json                           -- TypeScript configuration
│   └── web                                         -- React frontend
│       ├── src
│       │   ├── components/                         -- UI components
│       │   │   └── auth/                           -- authentication components
│       │   ├── context/                            -- React context
│       │   ├── data/                               -- mock data
│       │   ├── hooks/                              -- custom React hooks
│       │   ├── layouts/                            -- layout components
│       │   ├── lib/                                -- utility functions
│       │   ├── mirage/                             -- mock API setup
│       │   ├── routes/                             -- client routes
│       │   │   ├── _auth/                          -- authentication routes
│       │   │   └── dashboard/                      -- dashboard routes
│       │   ├── main.tsx                            -- root renderer
│       │   ├── index.css                           -- global styles
│       │   └── routeTree.gen.ts                    -- generated route tree
│       ├── .env.example                            -- frontend environment template
│       ├── tsconfig.app.json                       -- application TypeScript configuration
│       ├── tsconfig.json                           -- TypeScript configuration
│       ├── tsconfig.node.json                      -- tooling TypeScript configuration
│       └── vite.config.ts                          -- bundler configuration
├── packages
│   └── shared
│       └── src
│           ├── data/                               -- shared mock data
│           ├── schemas/                            -- shared schemas
│           ├── types/                              -- shared types
│           └── index.ts                            -- shared package entrypoint
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

The API and frontend require environment variables to function. Create environment files from the provided templates:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Update `apps/api/.env` with your values:

```dotenv
DATABASE_URL=mongodb://127.0.0.1:27017/?directConnection=true
DB_NAME=syncboard
PORT=3000
BETTER_AUTH_SECRET=a_secret_with_at_least_32_characters
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,https://yourdomain.com
```

Update `apps/api/.env` with your values:

```dotenv
VITE_API_URL=http://localhost:3000
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
