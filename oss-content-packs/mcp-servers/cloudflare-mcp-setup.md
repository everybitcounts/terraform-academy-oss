# Cloudflare MCP Server Setup

A guide to configuring MCP servers for Cloudflare integration in VS Code and Windsurf IDE.

## What is Cloudflare MCP?

Cloudflare MCP servers enable AI assistants to:

- Manage DNS records
- Configure Workers
- View analytics
- Manage WAF rules
- Access KV storage
- Query D1 databases

## Prerequisites

- Cloudflare account
- API token with required permissions
- Node.js 18 or later
- VS Code or Windsurf IDE

## Creating API Token

### Global API Key (Not Recommended)

Available in Profile then API Tokens, but grants full access.

### Scoped API Token (Recommended)

1. Go to dash.cloudflare.com
2. Click on your profile then API Tokens
3. Click "Create Token"
4. Choose "Create Custom Token"
5. Configure permissions based on needs:

| Permission | Access | Use Case |
|------------|--------|----------|
| Zone:DNS | Read/Edit | DNS management |
| Zone:Zone | Read | Zone info |
| Account:Workers Scripts | Read/Edit | Workers |
| Account:Workers KV Storage | Read/Edit | KV |
| Account:D1 | Read/Edit | D1 databases |

6. Set zone resources (All zones or specific)
7. Create token and copy it

## Basic Configuration

### VS Code

Add to VS Code settings JSON:

```json
{
  "mcp.servers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-api-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id"
      }
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-api-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id"
      }
    }
  }
}
```

## Finding Your Account ID

1. Go to dash.cloudflare.com
2. Select any zone
3. Account ID is in the right sidebar under "API"
4. Or visit: dash.cloudflare.com/profile/api-tokens

## DNS Management

### Configuration

```json
{
  "mcpServers": {
    "cloudflare-dns": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare-dns"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-dns-token",
        "CLOUDFLARE_ZONE_ID": "your-zone-id"
      }
    }
  }
}
```

### Operations

- List DNS records
- Create/update records
- Delete records
- Query record types

## Workers Integration

### Configuration

```json
{
  "mcpServers": {
    "cloudflare-workers": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare-workers"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-workers-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id"
      }
    }
  }
}
```

### Operations

- List Workers
- Get Worker script
- Deploy Worker
- View Worker logs
- Manage routes

## KV Storage

### Configuration

```json
{
  "mcpServers": {
    "cloudflare-kv": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare-kv"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-kv-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id",
        "KV_NAMESPACE_ID": "your-namespace-id"
      }
    }
  }
}
```

### Operations

- List namespaces
- Get/put/delete keys
- List keys in namespace

## D1 Database

### Configuration

```json
{
  "mcpServers": {
    "cloudflare-d1": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare-d1"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-d1-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id",
        "D1_DATABASE_ID": "your-database-id"
      }
    }
  }
}
```

### Operations

- List databases
- Execute SQL queries
- Get table schema

## Custom Cloudflare MCP Server

Create a custom server for specific Cloudflare services:

### server.js

```javascript
#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

const server = new Server({
  name: 'cloudflare-server',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

async function cfRequest(path, options = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  return response.json();
}

server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'list_zones',
      description: 'List all Cloudflare zones',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'list_workers',
      description: 'List Workers scripts',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'list_dns_records',
      description: 'List DNS records for a zone',
      inputSchema: {
        type: 'object',
        properties: {
          zone_id: { type: 'string', description: 'Zone ID' }
        },
        required: ['zone_id']
      }
    }
  ]
}));

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case 'list_zones': {
      const result = await cfRequest('/zones');
      const zones = result.result.map(z => ({
        id: z.id,
        name: z.name,
        status: z.status
      }));
      return { content: [{ type: 'text', text: JSON.stringify(zones, null, 2) }] };
    }
    
    case 'list_workers': {
      const result = await cfRequest(`/accounts/${CF_ACCOUNT_ID}/workers/scripts`);
      return { content: [{ type: 'text', text: JSON.stringify(result.result, null, 2) }] };
    }
    
    case 'list_dns_records': {
      const result = await cfRequest(`/zones/${args.zone_id}/dns_records`);
      const records = result.result.map(r => ({
        type: r.type,
        name: r.name,
        content: r.content,
        proxied: r.proxied
      }));
      return { content: [{ type: 'text', text: JSON.stringify(records, null, 2) }] };
    }
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
```

### Configuration

```json
{
  "mcpServers": {
    "cloudflare-custom": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-api-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id"
      }
    }
  }
}
```

## Complete Multi Service Setup

```json
{
  "mcpServers": {
    "cloudflare-dns": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "dns-scoped-token",
        "CLOUDFLARE_ZONE_ID": "zone-id"
      }
    },
    "cloudflare-workers": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "workers-scoped-token",
        "CLOUDFLARE_ACCOUNT_ID": "account-id"
      }
    },
    "cloudflare-analytics": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "analytics-token",
        "CLOUDFLARE_ZONE_ID": "zone-id"
      },
      "disabled": true
    }
  }
}
```

## Security Best Practices

1. **Scoped tokens**: Create tokens with minimal permissions
2. **Token per service**: Use different tokens for different MCP servers
3. **IP restrictions**: Limit token usage by IP if possible
4. **Regular rotation**: Rotate tokens periodically
5. **Audit logs**: Review API token usage in dashboard

### Minimal Token for Read Only

```
Permissions:
- Zone:DNS:Read
- Zone:Zone:Read
- Zone:Analytics:Read

Zone Resources:
- Include: All zones (or specific zones)
```

## Troubleshooting

### Authentication Failed

```
Error: 10000: Authentication error
```

Solution:
- Verify token is correct
- Check token has not been revoked
- Ensure token has required permissions

### Zone Not Found

```
Error: 7003: Could not route to zone
```

Solution:
- Verify zone ID is correct
- Check token has access to the zone

### Account Access Denied

```
Error: 10001: Account access denied
```

Solution:
- Verify account ID is correct
- Ensure token has account level permissions

## Example Prompts

With Cloudflare MCP configured, you can ask:

- "List all my Cloudflare zones"
- "Show DNS records for example.com"
- "What Workers are deployed in my account?"
- "Get the content of my api-worker script"
- "What keys are in my KV namespace?"

## Next Steps

- Configure cloud providers: [AWS MCP](./aws-mcp-setup.md), [Azure MCP](./azure-mcp-setup.md), [GCP MCP](./gcp-mcp-setup.md)
- Set up observability: [Grafana MCP](./grafana-mcp-setup.md)
- Learn AI prompting: [AI Agent Prompting Guide](../ai-tooling/ai-agent-prompting-guide.md)

## Official Resources

- Cloudflare API: https://developers.cloudflare.com/api/
- API Tokens: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
- Workers API: https://developers.cloudflare.com/workers/runtime-apis/

---

**Master edge computing.** Visit [terraformacademy.app](https://terraformacademy.app) for cloud certification prep including CDN, edge computing, and infrastructure automation.
