# AI Tooling Guides

Guides for configuring AI assistants and MCP servers in development environments.

## IDE Setup

| IDE | Guide | Description |
|-----|-------|-------------|
| VS Code | [mcp-server-vscode-setup.md](./mcp-server-vscode-setup.md) | MCP configuration for VS Code |
| Windsurf | [mcp-server-windsurf-setup.md](./mcp-server-windsurf-setup.md) | MCP configuration for Windsurf IDE |

## AI Best Practices

| Topic | Guide | Description |
|-------|-------|-------------|
| Prompting | [ai-agent-prompting-guide.md](./ai-agent-prompting-guide.md) | Best practices for AI assisted development |

## What is MCP?

Model Context Protocol (MCP) is an open standard that connects AI assistants to external tools and data sources. With MCP, your AI assistant can:

- Execute commands in cloud environments
- Query databases and APIs
- Manage infrastructure resources
- Access documentation and context

## Quick Start

### VS Code

1. Open Settings JSON (Cmd+Shift+P then "Preferences: Open User Settings JSON")
2. Add MCP server configuration:

```json
{
  "mcp.servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "/path/to/workspace"]
    }
  }
}
```

### Windsurf

1. Create or edit `~/.codeium/windsurf/mcp_config.json`
2. Add server configuration:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "/path/to/workspace"]
    }
  }
}
```

## Cloud Provider MCP Servers

For cloud infrastructure access, see the [MCP Servers](../mcp-servers/) directory:

- [AWS MCP Setup](../mcp-servers/aws-mcp-setup.md)
- [Azure MCP Setup](../mcp-servers/azure-mcp-setup.md)
- [GCP MCP Setup](../mcp-servers/gcp-mcp-setup.md)
- [Grafana MCP Setup](../mcp-servers/grafana-mcp-setup.md)
- [Cloudflare MCP Setup](../mcp-servers/cloudflare-mcp-setup.md)

## AI API Integration

For direct API integration:

- [AWS Bedrock Setup](../cloud-ai-apis/aws-bedrock-api-setup.md)
- [Azure OpenAI Setup](../cloud-ai-apis/azure-openai-api-setup.md)
- [GCP Vertex AI Setup](../cloud-ai-apis/gcp-vertex-ai-api-setup.md)
- [OpenAI API Setup](../cloud-ai-apis/openai-api-vscode-integration.md)
- [Anthropic Claude Setup](../cloud-ai-apis/anthropic-claude-api-setup.md)

## Contributing

These guides are part of the Terraform Academy open source content packs. Contributions welcome via pull request.

---

**Master AI assisted development.** Get certified at [terraformacademy.app](https://terraformacademy.app).
