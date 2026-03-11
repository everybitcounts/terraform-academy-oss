# Azure MCP Server Setup

A guide to configuring MCP servers for Azure integration in VS Code and Windsurf IDE.

## Available Azure MCP Servers

| Server | Purpose | Package |
|--------|---------|---------|
| Azure CLI | Run Azure commands | Community server |
| Azure Storage | Blob and file operations | Community server |
| Azure DevOps | Pipelines and repos | Community server |
| Key Vault | Secret access | Custom implementation |

## Prerequisites

- Azure CLI installed and configured
- Azure subscription
- Node.js 18 or later
- VS Code or Windsurf IDE

## Azure CLI MCP Server

### VS Code Configuration

Add to VS Code settings JSON:

```json
{
  "mcp.servers": {
    "azure-cli": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id"
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
    "azure-cli": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id"
      }
    }
  }
}
```

## Authentication Methods

### Option 1: Azure CLI Login (Recommended)

```bash
# Login first
az login

# Set default subscription
az account set --subscription "your-subscription-id"
```

Then configure MCP without credentials:

```json
{
  "mcpServers": {
    "azure-cli": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"]
    }
  }
}
```

### Option 2: Service Principal

```bash
# Create service principal
az ad sp create-for-rbac --name "mcp-server-sp" --role contributor \
  --scopes /subscriptions/your-subscription-id
```

Configure with credentials:

```json
{
  "mcpServers": {
    "azure-cli": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": {
        "AZURE_CLIENT_ID": "app-id",
        "AZURE_CLIENT_SECRET": "password",
        "AZURE_TENANT_ID": "tenant-id",
        "AZURE_SUBSCRIPTION_ID": "subscription-id"
      }
    }
  }
}
```

### Option 3: Managed Identity

For Azure hosted environments:

```json
{
  "mcpServers": {
    "azure-cli": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": {
        "AZURE_USE_MANAGED_IDENTITY": "true",
        "AZURE_SUBSCRIPTION_ID": "subscription-id"
      }
    }
  }
}
```

## Azure Storage MCP Server

For blob and file operations:

```json
{
  "mcpServers": {
    "azure-storage": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-storage"],
      "env": {
        "AZURE_STORAGE_ACCOUNT": "mystorageaccount",
        "AZURE_STORAGE_KEY": "your-storage-key"
      }
    }
  }
}
```

### Using Connection String

```json
{
  "mcpServers": {
    "azure-storage": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-storage"],
      "env": {
        "AZURE_STORAGE_CONNECTION_STRING": "DefaultEndpointsProtocol=https;AccountName=..."
      }
    }
  }
}
```

## Azure DevOps MCP Server

Access repos, pipelines, and work items:

```json
{
  "mcpServers": {
    "azure-devops": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-devops"],
      "env": {
        "AZURE_DEVOPS_ORG_URL": "https://dev.azure.com/your-org",
        "AZURE_DEVOPS_PAT": "your-personal-access-token"
      }
    }
  }
}
```

### Creating a PAT

1. Go to dev.azure.com
2. Click user settings then Personal access tokens
3. Create new token with required scopes:
   - Code: Read
   - Build: Read
   - Work Items: Read

## Key Vault MCP Server

Access secrets securely:

```json
{
  "mcpServers": {
    "azure-keyvault": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-keyvault"],
      "env": {
        "AZURE_KEY_VAULT_URL": "https://my-vault.vault.azure.net/",
        "AZURE_CLIENT_ID": "app-id",
        "AZURE_CLIENT_SECRET": "secret",
        "AZURE_TENANT_ID": "tenant-id"
      }
    }
  }
}
```

## Custom Azure MCP Server

Create a custom server for specific Azure services:

### server.js

```javascript
#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { ResourceManagementClient } = require('@azure/arm-resources');
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const client = new ResourceManagementClient(credential, subscriptionId);

const server = new Server({
  name: 'azure-resources-server',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'list_resource_groups',
    description: 'List all resource groups',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'list_resource_groups') {
    const groups = [];
    for await (const group of client.resourceGroups.list()) {
      groups.push({
        name: group.name,
        location: group.location,
        tags: group.tags
      });
    }
    return { content: [{ type: 'text', text: JSON.stringify(groups, null, 2) }] };
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
```

### Configuration

```json
{
  "mcpServers": {
    "azure-resources": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id"
      }
    }
  }
}
```

## Multiple Subscriptions

Configure servers for different subscriptions:

```json
{
  "mcpServers": {
    "azure-dev": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "dev-subscription-id"
      }
    },
    "azure-prod": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "prod-subscription-id"
      },
      "disabled": true
    }
  }
}
```

## Security Best Practices

1. **Use managed identity**: When running in Azure
2. **Service principals**: For automation, use limited scope
3. **Key Vault**: Store secrets in Key Vault, not config files
4. **RBAC**: Assign minimal required roles
5. **Audit logging**: Enable Azure Activity Log

### Recommended Role Assignment

```bash
# Read only access for MCP
az role assignment create \
  --assignee "app-id" \
  --role "Reader" \
  --scope "/subscriptions/subscription-id"
```

## Troubleshooting

### Authentication Failed

```
Error: DefaultAzureCredential failed to retrieve a token
```

Solution:
```bash
# Re-login
az login

# Verify account
az account show
```

### Subscription Not Found

```
Error: Subscription not found
```

Solution: Set the correct subscription ID:
```bash
az account list --output table
az account set --subscription "correct-id"
```

### Permission Denied

```
AuthorizationFailed: does not have authorization
```

Solution: Check RBAC role assignments in Azure Portal.

## Example Prompts

With Azure MCP configured, you can ask:

- "List all resource groups in my subscription"
- "Show me the VMs in the production resource group"
- "Get the connection string from Key Vault"
- "What Azure DevOps pipelines ran today?"

## Next Steps

- Configure other cloud providers: [AWS MCP](./aws-mcp-setup.md), [GCP MCP](./gcp-mcp-setup.md)
- Learn AI prompting: [AI Agent Prompting Guide](../ai-tooling/ai-agent-prompting-guide.md)
- Practice with labs: [Azure Resources Lab](../labs/azure-resource-lab.js)

## Official Resources

- Azure CLI: https://learn.microsoft.com/cli/azure/
- Azure SDK for JavaScript: https://learn.microsoft.com/javascript/api/overview/azure/
- Azure Identity: https://learn.microsoft.com/javascript/api/@azure/identity/

---

**Master Azure infrastructure.** Get certified at [terraformacademy.app](https://terraformacademy.app) with Azure Fundamentals, Administrator, and AI Fundamentals exam prep.
