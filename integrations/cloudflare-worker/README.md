# Cloudflare Worker Template

A production-ready Cloudflare Worker template for building edge APIs.

## Features

- **CORS** — Configurable allowed origins with preflight handling
- **Rate limiting** — In-memory per-IP rate limiter (60 req/min default)
- **Structured routing** — Clean path-based request handling
- **JSON responses** — Consistent error and success response format
- **Health check** — Built-in `/health` endpoint
- **Environment variables** — Via `wrangler.toml` or dashboard secrets

## Quick Start

```bash
# Install wrangler
npm install -g wrangler

# Copy config
cp wrangler.toml.example wrangler.toml
# Edit wrangler.toml with your account_id and settings

# Local dev
npx wrangler dev

# Deploy
npx wrangler deploy
```

## Adding Routes

Add new routes in the `handleRequest()` function:

```javascript
if (path === '/api/my-endpoint' && method === 'POST') {
  const body = await request.json();
  // Your logic here
  return jsonResponse({ success: true }, 200, request, env);
}
```

## Secrets

Never put API keys in `wrangler.toml`. Use wrangler secrets:

```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put SUPABASE_KEY
```

Access them via `env.OPENAI_API_KEY` in your worker code.
