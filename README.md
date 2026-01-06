# SvelteKit + Netlify Blobs API

A SvelteKit application with API routes for storing and retrieving data using Netlify Blobs.

## Features

- Store data to Netlify Blobs via POST endpoint
- Retrieve data from Netlify Blobs via GET endpoint
- Simple web interface for testing the API
- TypeScript support

## API Endpoints

### Store Data

**POST** `/api/store`

Request body:
```json
{
  "key": "my-key",
  "value": "any data here"
}
```

Response:
```json
{
  "success": true,
  "key": "my-key",
  "message": "Data stored successfully"
}
```

### Retrieve Data

**GET** `/api/retrieve/{key}`

Response:
```json
{
  "success": true,
  "key": "my-key",
  "value": "any data here"
}
```

## Development

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm run dev
```

3. Open browser at `http://localhost:5173`

## Deployment to Netlify

1. Install Netlify CLI:
```bash
pnpm add -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

The Netlify Blobs authentication is handled automatically by Netlify's platform context when deployed.

## Local Testing with Netlify

To test with Netlify Blobs locally:

```bash
netlify dev
```

This will start the development server with Netlify's environment, allowing you to test the Blobs integration.

## Environment Variables

When deployed to Netlify, the following variables are automatically injected:
- `NETLIFY_SITE_ID` - Your site ID
- `NETLIFY_AUTH_TOKEN` - Authentication token for Netlify services

For local development with `netlify dev`, these are handled automatically.
