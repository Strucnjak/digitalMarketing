# Admin Frontend

A Vite + React admin frontend for the read-only marketing backend.

## Prerequisites
- Node 20+
- npm 9+

## Environment
- `VITE_ADMIN_API_BASE` (optional): API base path. Defaults to `/api/admin`.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The UI expects the backend endpoints described in `/api/admin` and uses an API key passed via the `x-api-key` header.
