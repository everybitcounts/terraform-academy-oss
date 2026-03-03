# API Integration Guide

Connect the frontend modules to backend services for persistence, authentication, and real-time features.

## Supabase Client

All modules use the Supabase JS client for database operations:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
  const supabase = window.supabase.createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_ANON_KEY'
  );
</script>
```

### Save Quiz Results

```javascript
async function saveQuizResult(result) {
  const { error } = await supabase.from('quiz_results').insert({
    user_id: getUserId(),
    module_name: result.module,
    score: result.score,
    total_questions: result.total,
    percentage: result.percentage,
    time_taken_seconds: result.time,
    passed: result.percentage >= 70
  });
  if (error) console.error('Save failed:', error);
}
```

### Save Lab Completion

```javascript
async function saveLabCompletion(lab) {
  const { error } = await supabase.from('lab_completions').insert({
    user_id: getUserId(),
    lab_name: lab.name,
    completed: true,
    time_taken_seconds: lab.time,
    attempts: lab.attempts
  });
}
```

### Fetch Leaderboard

```javascript
async function getLeaderboard() {
  const { data } = await supabase
    .from('leaderboard')  // This is a view defined in schema.sql
    .select('*')
    .limit(50);
  return data;
}
```

## Cloudflare Worker API

For operations requiring server-side logic (API key protection, rate limiting):

```javascript
const API_BASE = 'https://your-worker.your-subdomain.workers.dev';

async function apiCall(endpoint, body) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
}

// Example: AI-powered question generation
const questions = await apiCall('/api/generate-questions', {
  topic: 'AWS VPC',
  count: 10,
  difficulty: 'intermediate'
});
```

## Authentication

### Anonymous Users

By default, all modules work without authentication. User identity is tracked via localStorage:

```javascript
function getUserId() {
  let id = localStorage.getItem('user_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('user_id', id);
  }
  return id;
}
```

### Supabase Auth (Optional)

For proper user accounts:

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## Real-Time Subscriptions

Listen for live updates (e.g., multiplayer quiz battles):

```javascript
const channel = supabase
  .channel('quiz-room')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'quiz_results'
  }, (payload) => {
    console.log('New result:', payload.new);
    updateLeaderboard();
  })
  .subscribe();
```

## Rate Limiting

The Cloudflare Worker template includes built-in rate limiting:

- **Default**: 60 requests per minute per IP
- **Configurable** in `worker.js` via the `RATE_LIMIT` and `RATE_WINDOW` constants
- Returns `429 Too Many Requests` when exceeded

## Error Handling Pattern

```javascript
async function safeFetch(fn) {
  try {
    const result = await fn();
    if (result.error) {
      console.error('API error:', result.error);
      toast('Something went wrong. Please try again.', 'error');
      return null;
    }
    return result.data;
  } catch (err) {
    console.error('Network error:', err);
    toast('Network error. Check your connection.', 'error');
    return null;
  }
}

// Usage
const results = await safeFetch(() =>
  supabase.from('quiz_results').select('*').eq('user_id', getUserId())
);
```
