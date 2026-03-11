# MCP Server Setup for VS Code

A comprehensive guide to configuring Model Context Protocol (MCP) servers in Visual Studio Code for AI assisted development.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI assistants to securely connect to external data sources and tools. MCP servers extend AI capabilities by providing access to files, APIs, databases, and cloud services.

## Prerequisites

- VS Code 1.85 or later
- Node.js 18 or later
- GitHub Copilot or compatible AI extension
- Basic familiarity with JSON configuration

## Installing MCP Support

### Step 1: Install Required Extensions

Open VS Code and install:

1. **GitHub Copilot** (or your preferred AI assistant)
2. **MCP extension** (if available separately)

Via command line:

```bash
code --install-extension GitHub.copilot
```

### Step 2: Configure MCP Settings

Create or edit your VS Code settings:

1. Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
2. Search "Preferences: Open User Settings (JSON)"
3. Add MCP configuration:

```json
{
  "mcp.servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
```

## Common MCP Server Configurations

### Filesystem Server

Access local files and directories:

```json
{
  "mcp.servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
    }
  }
}
```

### GitHub Server

Access GitHub repositories and issues:

```json
{
  "mcp.servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_TOKEN}"
      }
    }
  }
}
```

### PostgreSQL Server

Query databases:

```json
{
  "mcp.servers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/dbname"
      }
    }
  }
}
```

### Fetch Server

Make HTTP requests:

```json
{
  "mcp.servers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

## Workspace Configuration

For project specific MCP servers, create `.vscode/settings.json`:

```json
{
  "mcp.servers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${env:PROJECT_DATABASE_URL}"
      }
    },
    "project-files": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}/src"]
    }
  }
}
```

## Environment Variables

Store sensitive data in environment variables:

### macOS/Linux

Add to `~/.zshrc` or `~/.bashrc`:

```bash
export GITHUB_TOKEN="ghp_your_token_here"
export DATABASE_URL="postgresql://..."
export OPENAI_API_KEY="sk-..."
```

### Windows

```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_your_token_here", "User")
```

## Verifying MCP Connection

1. Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
2. Search "MCP: Show Connected Servers"
3. Verify your servers appear in the list

Or check the Output panel:

1. View > Output
2. Select "MCP" from the dropdown

## Multiple Server Configuration

Configure multiple servers for comprehensive AI access:

```json
{
  "mcp.servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_TOKEN}"
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

## Troubleshooting

### Server not connecting

```bash
# Verify Node.js version
node --version  # Should be 18+

# Test server manually
npx -y @modelcontextprotocol/server-filesystem /tmp
```

### Permission errors

Ensure the AI extension has permission to access MCP servers in VS Code settings.

### Environment variables not loading

Restart VS Code after setting environment variables. On macOS, you may need to launch VS Code from terminal:

```bash
code .
```

### Server crashes

Check the MCP output panel for error messages. Common issues:

- Missing dependencies
- Invalid configuration syntax
- Network connectivity for remote servers

## Security Best Practices

1. **Limit filesystem access**: Only expose necessary directories
2. **Use environment variables**: Never hardcode tokens in settings
3. **Review server permissions**: Understand what each server can access
4. **Use workspace settings**: Keep project tokens separate from global config

## Available MCP Servers

| Server | Purpose | Package |
|--------|---------|---------|
| Filesystem | File access | @modelcontextprotocol/server-filesystem |
| GitHub | Repos, issues, PRs | @modelcontextprotocol/server-github |
| PostgreSQL | Database queries | @modelcontextprotocol/server-postgres |
| Fetch | HTTP requests | @modelcontextprotocol/server-fetch |
| Memory | Persistent memory | @modelcontextprotocol/server-memory |
| Brave Search | Web search | @modelcontextprotocol/server-brave-search |
| Google Drive | Doc access | @modelcontextprotocol/server-gdrive |
| Slack | Messages | @modelcontextprotocol/server-slack |

## Next Steps

- Set up cloud provider MCP servers: [AWS](../mcp-servers/aws-mcp-setup.md), [Azure](../mcp-servers/azure-mcp-setup.md), [GCP](../mcp-servers/gcp-mcp-setup.md)
- Learn AI prompting techniques: [AI Agent Prompting Guide](./ai-agent-prompting-guide.md)
- Practice infrastructure automation: [Terraform Academy Labs](../labs/)

## Official Resources

- MCP Specification: https://modelcontextprotocol.io
- MCP Server Registry: https://github.com/modelcontextprotocol/servers
- VS Code MCP Documentation: https://code.visualstudio.com/docs

---

**Master AI for cloud infrastructure.** Visit [terraformacademy.app](https://terraformacademy.app) for AI certification prep including AWS AI Practitioner, Azure AI Fundamentals, and GCP Generative AI.
