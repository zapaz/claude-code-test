# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A SvelteKit application with API routes for storing and retrieving data using Netlify Blobs. The app is configured to deploy on Netlify Edge with `@sveltejs/adapter-netlify`.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (localhost:5173)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Local testing with Netlify environment and Blobs
netlify dev
```

## Architecture

### Netlify Blobs Integration

The app uses two environment-aware patterns for Netlify Blobs access:

**Development (local)**: Requires explicit credentials from environment variables
- `NETLIFY_SITE_ID` - Your Netlify site ID
- `NETLIFY_BLOBS_CONTEXT` - Authentication token for Blobs

**Production (Netlify Edge)**: Auto-detected credentials, no explicit config needed

Both API endpoints (`src/routes/api/store/+server.ts` and `src/routes/api/retrieve/[key]/+server.ts`) use this pattern:

```typescript
const store = import.meta.env.DEV
  ? getStore({
      name: 'my-store',
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_CONTEXT
    })
  : getStore('my-store');
```

### Data Encoding

The store API endpoints encode/decode data as follows:
- **Storage**: JSON.stringify → TextEncoder (ArrayBuffer)
- **Retrieval**: Handles both string (legacy) and ArrayBuffer formats → JSON.parse

### SvelteKit Structure

- `src/routes/+page.svelte` - Frontend UI for testing the API
- `src/routes/api/store/+server.ts` - POST endpoint for storing data
- `src/routes/api/retrieve/[key]/+server.ts` - GET endpoint with dynamic `[key]` parameter

### Netlify Adapter Configuration

Configured in `svelte.config.js`:
- `edge: true` - Deploys to Netlify Edge Functions
- `split: false` - Single function bundle

## Deployment

```bash
# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

Environment variables are automatically injected by Netlify when deployed.
