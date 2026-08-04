# Syncboard

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

