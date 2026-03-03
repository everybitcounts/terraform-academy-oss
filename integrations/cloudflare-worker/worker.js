/**
 * Terraform Academy OSS — Cloudflare Worker Template
 *
 * A production-ready edge API worker with:
 * - CORS handling with configurable allowed origins
 * - Rate limiting (in-memory, per-IP)
 * - Route-based request handling
 * - Error handling with structured JSON responses
 * - Health check endpoint
 *
 * Deploy: npx wrangler deploy
 * Config: wrangler.toml
 *
 * MIT License — https://github.com/terraform-academy/oss
 */

// ─── Configuration ───
// Set these via wrangler.toml [vars] or Cloudflare dashboard secrets
const DEFAULT_CONFIG = {
  ALLOWED_ORIGINS: ['http://localhost:3000', 'https://yourdomain.com'],
  RATE_LIMIT_MAX: 60,          // requests per window
  RATE_LIMIT_WINDOW: 60000,    // window in ms (60 seconds)
};

// ─── Rate Limiter (in-memory, per-isolate) ───
const rateLimitMap = new Map();

function checkRateLimit(ip, max = DEFAULT_CONFIG.RATE_LIMIT_MAX, window = DEFAULT_CONFIG.RATE_LIMIT_WINDOW) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > window) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return { allowed: true, remaining: max - 1 };
  }

  entry.count++;
  if (entry.count > max) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: max - entry.count };
}

// Periodic cleanup
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > DEFAULT_CONFIG.RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 60000);

// ─── CORS ───
function getCorsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = env?.ALLOWED_ORIGINS
    ? env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : DEFAULT_CONFIG.ALLOWED_ORIGINS;

  const isAllowed = allowedOrigins.some(allowed => {
    if (allowed.includes('*')) return true;
    return origin === allowed || origin.endsWith(allowed.replace('https://', '.'));
  });

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };
}

function handleOptions(request, env) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, env),
  });
}

// ─── Response Helpers ───
function jsonResponse(data, status = 200, request = null, env = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(request ? getCorsHeaders(request, env) : {}),
  };
  return new Response(JSON.stringify(data), { status, headers });
}

function errorResponse(message, status = 400, request = null, env = null) {
  return jsonResponse({ error: message }, status, request, env);
}

// ─── Route Handler ───
async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Rate limit check
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return errorResponse('Rate limit exceeded. Please try again later.', 429, request, env);
  }

  // ─── Routes ───
  try {
    // Health check
    if (path === '/health' || path === '/api/health') {
      return jsonResponse({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }, 200, request, env);
    }

    // Example: GET /api/quiz/modules
    if (path === '/api/quiz/modules' && method === 'GET') {
      return jsonResponse({
        modules: [
          { id: 'cloud-basics', name: 'Cloud Basics', questions: 5 },
          { id: 'iac', name: 'Infrastructure as Code', questions: 5 },
          { id: 'security', name: 'Security Fundamentals', questions: 5 },
        ]
      }, 200, request, env);
    }

    // Example: POST /api/quiz/submit
    if (path === '/api/quiz/submit' && method === 'POST') {
      const body = await request.json();
      const { moduleId, score, total } = body;

      if (!moduleId || score === undefined || !total) {
        return errorResponse('Missing required fields: moduleId, score, total', 400, request, env);
      }

      // Here you would save to Supabase, D1, KV, etc.
      return jsonResponse({
        success: true,
        message: `Score ${score}/${total} recorded for ${moduleId}`,
        timestamp: new Date().toISOString()
      }, 200, request, env);
    }

    // Example: POST /api/lab/complete
    if (path === '/api/lab/complete' && method === 'POST') {
      const body = await request.json();
      const { labId, userId } = body;

      if (!labId) {
        return errorResponse('Missing required field: labId', 400, request, env);
      }

      return jsonResponse({
        success: true,
        message: `Lab ${labId} marked complete`,
        timestamp: new Date().toISOString()
      }, 200, request, env);
    }

    // 404 fallback
    return errorResponse('Not found', 404, request, env);

  } catch (err) {
    console.error('Worker error:', err);
    return errorResponse('Internal server error', 500, request, env);
  }
}

// ─── Entry Point ───
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request, env);
    }

    return handleRequest(request, env);
  },
};
