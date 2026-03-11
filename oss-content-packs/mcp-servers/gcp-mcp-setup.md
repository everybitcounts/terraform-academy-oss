# GCP MCP Server Setup

A guide to configuring MCP servers for Google Cloud Platform integration in VS Code and Windsurf IDE.

## Available GCP MCP Servers

| Server | Purpose | Package |
|--------|---------|---------|
| gcloud CLI | Run GCP commands | Community server |
| Cloud Storage | GCS operations | Community server |
| BigQuery | Query data | Community server |
| Vertex AI | AI model access | Custom implementation |

## Prerequisites

- gcloud CLI installed and configured
- Google Cloud project with billing enabled
- Node.js 18 or later
- VS Code or Windsurf IDE

## gcloud CLI MCP Server

### VS Code Configuration

Add to VS Code settings JSON:

```json
{
  "mcp.servers": {
    "gcloud": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id"
      }
    }
  }
}
```

### Windsurf Configuration

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "gcloud": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id"
      }
    }
  }
}
```

## Authentication Methods

### Option 1: Application Default Credentials (Recommended)

```bash
# Login and set up ADC
gcloud auth application-default login

# Set default project
gcloud config set project my-project-id
```

Then configure MCP:

```json
{
  "mcpServers": {
    "gcloud": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id"
      }
    }
  }
}
```

### Option 2: Service Account Key

```bash
# Create service account
gcloud iam service-accounts create mcp-server \
  --display-name="MCP Server"

# Grant permissions
gcloud projects add-iam-policy-binding my-project-id \
  --member="serviceAccount:mcp-server@my-project-id.iam.gserviceaccount.com" \
  --role="roles/viewer"

# Create key file
gcloud iam service-accounts keys create key.json \
  --iam-account=mcp-server@my-project-id.iam.gserviceaccount.com
```

Configure with key file:

```json
{
  "mcpServers": {
    "gcloud": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/key.json",
        "GOOGLE_CLOUD_PROJECT": "my-project-id"
      }
    }
  }
}
```

### Option 3: Workload Identity (GKE)

For GKE environments:

```json
{
  "mcpServers": {
    "gcloud": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id"
      }
    }
  }
}
```

## Cloud Storage MCP Server

For GCS bucket operations:

```json
{
  "mcpServers": {
    "gcs": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcs"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id",
        "GCS_BUCKET": "my-bucket-name"
      }
    }
  }
}
```

### Allowed Operations

- List buckets
- List objects
- Get object content
- Upload objects
- Delete objects

## BigQuery MCP Server

Query and analyze data:

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "npx",
      "args": ["-y", "mcp-server-bigquery"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id",
        "BIGQUERY_LOCATION": "US"
      }
    }
  }
}
```

### Example Queries

With BigQuery MCP, the AI can:

- "Show me the schema of the users table"
- "Query the last 100 orders"
- "What datasets are available?"

## Vertex AI MCP Server

Access Gemini and other models:

```json
{
  "mcpServers": {
    "vertex-ai": {
      "command": "npx",
      "args": ["-y", "mcp-server-vertex-ai"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id",
        "GOOGLE_CLOUD_LOCATION": "us-central1"
      }
    }
  }
}
```

## Custom GCP MCP Server

Create a custom server for specific GCP services:

### server.js

```javascript
#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { Compute } = require('@google-cloud/compute');

const compute = new Compute();
const projectId = process.env.GOOGLE_CLOUD_PROJECT;

const server = new Server({
  name: 'gcp-compute-server',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'list_instances',
    description: 'List Compute Engine instances',
    inputSchema: {
      type: 'object',
      properties: {
        zone: { type: 'string', description: 'GCP zone' }
      }
    }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'list_instances') {
    const zone = request.params.arguments.zone || 'us-central1-a';
    const [vms] = await compute.zone(zone).getVMs();
    
    const instances = vms.map(vm => ({
      name: vm.name,
      status: vm.metadata.status,
      machineType: vm.metadata.machineType.split('/').pop(),
      zone: zone
    }));
    
    return { content: [{ type: 'text', text: JSON.stringify(instances, null, 2) }] };
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
```

### Configuration

```json
{
  "mcpServers": {
    "gcp-compute": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-project-id"
      }
    }
  }
}
```

## Multiple Projects

Configure servers for different projects:

```json
{
  "mcpServers": {
    "gcp-dev": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-dev-project"
      }
    },
    "gcp-prod": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "my-prod-project"
      },
      "disabled": true
    }
  }
}
```

## Security Best Practices

1. **Use ADC**: Prefer Application Default Credentials
2. **Least privilege**: Grant minimal IAM roles
3. **Service accounts**: Use dedicated accounts for automation
4. **Key rotation**: Rotate service account keys regularly
5. **Audit logging**: Enable Cloud Audit Logs

### Recommended IAM Role

```bash
# Read only access for MCP
gcloud projects add-iam-policy-binding my-project-id \
  --member="serviceAccount:mcp-server@my-project-id.iam.gserviceaccount.com" \
  --role="roles/viewer"
```

### Custom Role (Minimal)

```yaml
title: MCP Server Role
description: Minimal permissions for MCP server
stage: GA
includedPermissions:
  - compute.instances.list
  - storage.buckets.list
  - storage.objects.list
  - storage.objects.get
  - bigquery.datasets.get
  - bigquery.tables.list
```

## Troubleshooting

### Authentication Failed

```
Error: Could not load the default credentials
```

Solution:
```bash
# Set up ADC
gcloud auth application-default login

# Or set credentials path
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

### Project Not Set

```
Error: project_id must be set
```

Solution:
```bash
gcloud config set project my-project-id
```

Or set in environment:
```json
{
  "env": {
    "GOOGLE_CLOUD_PROJECT": "my-project-id"
  }
}
```

### Permission Denied

```
Error: Permission denied on resource
```

Solution: Check IAM bindings:
```bash
gcloud projects get-iam-policy my-project-id \
  --flatten="bindings[].members" \
  --filter="bindings.members:mcp-server@"
```

## Example Prompts

With GCP MCP configured, you can ask:

- "List all Compute Engine instances in us-central1-a"
- "Show me the buckets in my project"
- "Query the analytics.events table for today"
- "What Cloud Functions are deployed?"

## Next Steps

- Configure other cloud providers: [AWS MCP](./aws-mcp-setup.md), [Azure MCP](./azure-mcp-setup.md)
- Learn AI prompting: [AI Agent Prompting Guide](../ai-tooling/ai-agent-prompting-guide.md)
- Practice with labs: [GCP Storage Lab](../labs/gcp-storage-lab.js)

## Official Resources

- gcloud CLI: https://cloud.google.com/sdk/gcloud
- Google Cloud Client Libraries: https://cloud.google.com/nodejs/docs/reference
- IAM: https://cloud.google.com/iam/docs

---

**Master GCP infrastructure.** Get certified at [terraformacademy.app](https://terraformacademy.app) with Cloud Digital Leader, Cloud Engineer, and Generative AI exam prep.
