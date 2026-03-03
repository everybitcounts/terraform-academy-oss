# Self-Hosting Guide

Deploy Terraform Academy OSS on your own infrastructure.

## Option 1: GitHub Pages (Free)

Best for: Quiz and lab engines without backend.

```bash
# Fork the repo, then enable Pages in Settings > Pages
# Or use GitHub Actions:
git clone https://github.com/YOUR_USER/terraform-academy-oss.git
cd terraform-academy-oss
git push origin main
# Enable GitHub Pages from Settings > Pages > Source: main branch
```

Your site will be live at `https://YOUR_USER.github.io/terraform-academy-oss/`.

## Option 2: Cloudflare Pages + Workers

Best for: Full setup with API proxy and rate limiting.

### Pages (Frontend)

```bash
# Connect your GitHub repo to Cloudflare Pages
# Build command: (none — static files)
# Output directory: /
```

### Worker (API)

```bash
cd integrations/cloudflare-worker
cp wrangler.toml.example wrangler.toml
# Edit wrangler.toml with your account details

npx wrangler login
npx wrangler deploy
```

Set secrets:
```bash
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_KEY
npx wrangler secret put ADMIN_KEY
```

## Option 3: Vercel / Netlify

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir .
```

Both platforms auto-detect static sites. No configuration needed.

## Option 4: Docker

Create a simple Dockerfile:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t terraform-academy .
docker run -p 8080:80 terraform-academy
```

Visit `http://localhost:8080`.

## Supabase Setup

If using backend features (persistence, auth, feature requests):

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `integrations/supabase/schema.sql` in the SQL Editor
3. Copy your project URL and anon key
4. Set them in your `.env` file or directly in HTML files
5. Enable Row Level Security policies as defined in the schema

See [integrations/supabase/README.md](../integrations/supabase/README.md) for table details.

## Environment Variables

```bash
# .env (never commit this file)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
ADMIN_KEY=your-secret-admin-key
OPENAI_API_KEY=sk-...  # Optional, for AI features
```

## Custom Domain

For any hosting provider:

1. Add a CNAME record pointing to your host
2. Enable HTTPS (usually automatic)
3. Update CORS origins in the Cloudflare Worker if applicable

## Monitoring

- **Cloudflare**: Built-in analytics on Pages and Workers dashboards
- **Supabase**: Database metrics in the project dashboard
- **Custom**: Add your preferred analytics script to the HTML files
