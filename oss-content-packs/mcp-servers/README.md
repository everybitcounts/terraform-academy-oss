# MCP Server Configurations

Setup guides for MCP (Model Context Protocol) servers for cloud providers and tools.

## Available Guides

| Provider | Guide | Services Covered |
|----------|-------|------------------|
| AWS | [aws-mcp-setup.md](./aws-mcp-setup.md) | CLI, S3, SSM, CloudWatch, EC2 |
| Azure | [azure-mcp-setup.md](./azure-mcp-setup.md) | CLI, Storage, DevOps, Key Vault |
| GCP | [gcp-mcp-setup.md](./gcp-mcp-setup.md) | gcloud, GCS, BigQuery, Vertex AI |
| Grafana | [grafana-mcp-setup.md](./grafana-mcp-setup.md) | Dashboards, alerts, data sources |
| Cloudflare | [cloudflare-mcp-setup.md](./cloudflare-mcp-setup.md) | DNS, Workers, KV, D1 |

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI assistants to connect with external tools and data sources. MCP servers expose capabilities that AI can use to:

- Query and manage cloud resources
- Access observability data
- Execute infrastructure changes
- Retrieve secrets and configuration

## Quick Configuration

### VS Code

Add to VS Code settings JSON:

```json
{
  "mcp.servers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server-package"],
      "env": {
        "API_KEY": "your-key"
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
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server-package"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

## Multi Cloud Setup

Example configuration with multiple providers:

```json
{
  "mcpServers": {
    "aws": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": { "AWS_PROFILE": "default" }
    },
    "azure": {
      "command": "npx",
      "args": ["-y", "mcp-server-azure-cli"],
      "env": { "AZURE_SUBSCRIPTION_ID": "..." }
    },
    "gcp": {
      "command": "npx",
      "args": ["-y", "mcp-server-gcloud"],
      "env": { "GOOGLE_CLOUD_PROJECT": "..." }
    },
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-cloudflare"],
      "env": { "CLOUDFLARE_API_TOKEN": "..." }
    }
  }
}
```

## Security Best Practices

1. **Least privilege**: Create tokens with minimal required permissions
2. **Separate tokens**: Use different tokens for different MCP servers
3. **Avoid secrets in config**: Use environment variables or secret managers
4. **Audit access**: Monitor API usage logs
5. **Rotate credentials**: Regularly rotate API keys and tokens

## IDE Setup Guides

For detailed IDE configuration:

- [VS Code MCP Setup](../ai-tooling/mcp-server-vscode-setup.md)
- [Windsurf MCP Setup](../ai-tooling/mcp-server-windsurf-setup.md)

## AI API Guides

For direct API integration (without MCP):

- [AWS Bedrock](../cloud-ai-apis/aws-bedrock-api-setup.md)
- [Azure OpenAI](../cloud-ai-apis/azure-openai-api-setup.md)
- [GCP Vertex AI](../cloud-ai-apis/gcp-vertex-ai-api-setup.md)

## Contributing

These guides are part of the Terraform Academy open source content packs. Contributions welcome via pull request.

---

**Master cloud infrastructure.** Get certified at [terraformacademy.app](https://terraformacademy.app).
