# Grafana MCP Server Setup

A guide to configuring MCP servers for Grafana integration in VS Code and Windsurf IDE.

## What is Grafana MCP?

Grafana MCP servers enable AI assistants to:

- Query dashboards and panels
- Access data sources
- Retrieve alert information
- Analyze metrics and logs

## Prerequisites

- Grafana instance (Cloud or self hosted)
- Grafana API key or service account token
- Node.js 18 or later
- VS Code or Windsurf IDE

## Creating API Credentials

### Grafana Cloud

1. Go to grafana.com and sign in
2. Navigate to My Account then API Keys
3. Click "Add API Key"
4. Select role: Viewer (for read only) or Editor
5. Copy the generated key

### Self Hosted Grafana

1. Go to Configuration then API Keys
2. Click "Add API key"
3. Name: mcp-server
4. Role: Viewer
5. Copy the generated key

### Service Account (Recommended)

1. Go to Administration then Service Accounts
2. Click "Add service account"
3. Name: mcp-server
4. Role: Viewer
5. Add token and copy it

## Basic Configuration

### VS Code

Add to VS Code settings JSON:

```json
{
  "mcp.servers": {
    "grafana": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://your-instance.grafana.net",
        "GRAFANA_API_KEY": "glsa_your_api_key"
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
    "grafana": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://your-instance.grafana.net",
        "GRAFANA_API_KEY": "glsa_your_api_key"
      }
    }
  }
}
```

## Available Operations

### Dashboard Operations

- List all dashboards
- Get dashboard by UID
- Search dashboards by tag or name
- Get panel data

### Data Source Operations

- List data sources
- Query data source
- Test data source connection

### Alert Operations

- List alert rules
- Get alert status
- View alert history

## Advanced Configuration

### With Organization ID

For multi org Grafana:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://your-instance.grafana.net",
        "GRAFANA_API_KEY": "glsa_your_api_key",
        "GRAFANA_ORG_ID": "1"
      }
    }
  }
}
```

### With Basic Auth

For instances using basic authentication:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://your-grafana.example.com",
        "GRAFANA_USER": "admin",
        "GRAFANA_PASSWORD": "your-password"
      }
    }
  }
}
```

### Self Signed Certificates

For self hosted instances with self signed certs:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://grafana.internal",
        "GRAFANA_API_KEY": "your-key",
        "NODE_TLS_REJECT_UNAUTHORIZED": "0"
      }
    }
  }
}
```

## Custom Grafana MCP Server

Create a custom server with specific functionality:

### server.js

```javascript
#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

const GRAFANA_URL = process.env.GRAFANA_URL;
const GRAFANA_API_KEY = process.env.GRAFANA_API_KEY;

const server = new Server({
  name: 'grafana-server',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

async function grafanaRequest(path) {
  const response = await fetch(`${GRAFANA_URL}/api${path}`, {
    headers: {
      'Authorization': `Bearer ${GRAFANA_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'list_dashboards',
      description: 'List all Grafana dashboards',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'get_dashboard',
      description: 'Get dashboard by UID',
      inputSchema: {
        type: 'object',
        properties: {
          uid: { type: 'string', description: 'Dashboard UID' }
        },
        required: ['uid']
      }
    },
    {
      name: 'list_alerts',
      description: 'List active alerts',
      inputSchema: { type: 'object', properties: {} }
    }
  ]
}));

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case 'list_dashboards': {
      const dashboards = await grafanaRequest('/search?type=dash-db');
      return { content: [{ type: 'text', text: JSON.stringify(dashboards, null, 2) }] };
    }
    
    case 'get_dashboard': {
      const dashboard = await grafanaRequest(`/dashboards/uid/${args.uid}`);
      return { content: [{ type: 'text', text: JSON.stringify(dashboard, null, 2) }] };
    }
    
    case 'list_alerts': {
      const alerts = await grafanaRequest('/alerting/grafana/api/v1/alerts');
      return { content: [{ type: 'text', text: JSON.stringify(alerts, null, 2) }] };
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
    "grafana-custom": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "GRAFANA_URL": "https://your-instance.grafana.net",
        "GRAFANA_API_KEY": "glsa_your_api_key"
      }
    }
  }
}
```

## Multiple Grafana Instances

Configure servers for different environments:

```json
{
  "mcpServers": {
    "grafana-dev": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://dev-grafana.example.com",
        "GRAFANA_API_KEY": "dev-api-key"
      }
    },
    "grafana-prod": {
      "command": "npx",
      "args": ["-y", "mcp-server-grafana"],
      "env": {
        "GRAFANA_URL": "https://prod-grafana.example.com",
        "GRAFANA_API_KEY": "prod-api-key"
      },
      "disabled": true
    }
  }
}
```

## Security Best Practices

1. **Use service accounts**: Create dedicated service accounts for MCP
2. **Viewer role only**: Grant minimal permissions
3. **API key rotation**: Rotate keys regularly
4. **Network restrictions**: Limit API access by IP if possible
5. **Audit access**: Monitor API usage in Grafana logs

### Minimal Permission Role

Create a custom role with minimal permissions:

```yaml
name: MCP Reader
permissions:
  - action: dashboards:read
    scope: dashboards:*
  - action: datasources:read
    scope: datasources:*
  - action: alerting.rule:read
    scope: alerting.rule:*
```

## Troubleshooting

### Authentication Failed

```
Error: 401 Unauthorized
```

Solution:
- Verify API key is correct
- Check key has not expired
- Ensure correct organization ID

### Dashboard Not Found

```
Error: Dashboard not found
```

Solution:
- Verify dashboard UID is correct (not the database ID)
- Check permissions for the API key

### Connection Refused

```
Error: ECONNREFUSED
```

Solution:
- Verify Grafana URL is correct
- Check network connectivity
- Ensure Grafana service is running

## Example Prompts

With Grafana MCP configured, you can ask:

- "List all dashboards in Grafana"
- "Show me the alerts that are currently firing"
- "Get the CPU usage panel from the system dashboard"
- "What data sources are configured?"

## Integration with Observability Stack

### With Prometheus

```json
{
  "mcpServers": {
    "grafana": { ... },
    "prometheus": {
      "command": "npx",
      "args": ["-y", "mcp-server-prometheus"],
      "env": {
        "PROMETHEUS_URL": "http://prometheus:9090"
      }
    }
  }
}
```

### With Loki

```json
{
  "mcpServers": {
    "grafana": { ... },
    "loki": {
      "command": "npx",
      "args": ["-y", "mcp-server-loki"],
      "env": {
        "LOKI_URL": "http://loki:3100"
      }
    }
  }
}
```

## Next Steps

- Configure cloud providers: [AWS MCP](./aws-mcp-setup.md), [Azure MCP](./azure-mcp-setup.md), [GCP MCP](./gcp-mcp-setup.md)
- Set up Cloudflare: [Cloudflare MCP](./cloudflare-mcp-setup.md)
- Learn AI prompting: [AI Agent Prompting Guide](../ai-tooling/ai-agent-prompting-guide.md)

## Official Resources

- Grafana HTTP API: https://grafana.com/docs/grafana/latest/developers/http_api/
- Grafana Cloud API: https://grafana.com/docs/grafana-cloud/api/
- Service Accounts: https://grafana.com/docs/grafana/latest/administration/service-accounts/

---

**Master observability skills.** Visit [terraformacademy.app](https://terraformacademy.app) for cloud certification prep including monitoring and observability best practices.
