# MCP Server Setup for Windsurf IDE

A comprehensive guide to configuring Model Context Protocol (MCP) servers in Windsurf IDE for AI powered development.

## What is Windsurf?

Windsurf is an AI native IDE built by Codeium that integrates deeply with AI assistants. MCP servers extend its capabilities by connecting to external data sources, APIs, and cloud services.

## Prerequisites

- Windsurf IDE (latest version)
- Node.js 18 or later
- Basic familiarity with JSON configuration

## Locating Configuration File

Windsurf stores MCP configuration in:

### macOS

```
~/.codeium/windsurf/mcp_config.json
```

### Linux

```
~/.config/windsurf/mcp_config.json
```

### Windows

```
%APPDATA%\Windsurf\mcp_config.json
```

## Basic Configuration

Create or edit the MCP configuration file:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/directory"]
    }
  }
}
```

## Common Server Configurations

### Filesystem Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/projects"]
    }
  }
}
```

### GitHub Server

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### PostgreSQL Server

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

### Fetch Server

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

## Complete Multi Server Setup

A comprehensive configuration with multiple servers:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/projects"],
      "disabled": false
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      },
      "disabled": false
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "disabled": false
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "disabled": false
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your_brave_api_key"
      },
      "disabled": true
    }
  }
}
```

## Using npx vs Global Install

### Option 1: npx (Recommended)

Uses npx to run servers without global installation:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

### Option 2: Global Installation

Install globally first:

```bash
npm install -g @modelcontextprotocol/server-github
```

Then reference directly:

```json
{
  "mcpServers": {
    "github": {
      "command": "mcp-server-github"
    }
  }
}
```

## Environment Variables

### Option 1: Inline (Not Recommended for Secrets)

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_actual_token"
      }
    }
  }
}
```

### Option 2: Shell Environment (Recommended)

Set environment variables in your shell profile:

```bash
# ~/.zshrc or ~/.bashrc
export GITHUB_TOKEN="ghp_your_token"
export DATABASE_URL="postgresql://..."
```

Then reference in config:

```json
{
  "mcpServers": {
    "github": {
      "command": "/bin/bash",
      "args": ["-c", "GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_TOKEN npx -y @modelcontextprotocol/server-github"]
    }
  }
}
```

## Enabling and Disabling Servers

Toggle servers without removing configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "disabled": false
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "disabled": true
    }
  }
}
```

## Verifying Configuration

### Check Syntax

```bash
# Validate JSON syntax
cat ~/.codeium/windsurf/mcp_config.json | jq .
```

### Test Server Manually

```bash
# Test GitHub server
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_token npx -y @modelcontextprotocol/server-github
```

### Windsurf Logs

Check Windsurf logs for MCP connection status:

1. Open Windsurf
2. View > Output or Developer Tools
3. Look for MCP related messages

## Troubleshooting

### Server not connecting

1. Verify Node.js 18+: `node --version`
2. Check JSON syntax in config file
3. Restart Windsurf after config changes

### Permission denied

```bash
# Make sure npx is accessible
which npx

# Check server package exists
npx -y @modelcontextprotocol/server-filesystem --help
```

### Environment variables not loading

Launch Windsurf from terminal to inherit shell environment:

```bash
# macOS
open -a Windsurf

# Or from terminal in project directory
windsurf .
```

### Config file not found

Create the directory structure:

```bash
# macOS
mkdir -p ~/.codeium/windsurf
touch ~/.codeium/windsurf/mcp_config.json
```

## Security Best Practices

1. **Do not commit tokens**: Keep mcp_config.json out of version control
2. **Use environment variables**: Store secrets in shell profile
3. **Limit filesystem scope**: Only expose necessary directories
4. **Review server capabilities**: Understand what each server can access

## Available MCP Servers

| Server | Use Case | Package |
|--------|----------|---------|
| Filesystem | Local file access | @modelcontextprotocol/server-filesystem |
| GitHub | Repositories, issues | @modelcontextprotocol/server-github |
| PostgreSQL | Database queries | @modelcontextprotocol/server-postgres |
| SQLite | Local databases | @modelcontextprotocol/server-sqlite |
| Fetch | HTTP requests | @modelcontextprotocol/server-fetch |
| Memory | Persistent memory | @modelcontextprotocol/server-memory |
| Brave Search | Web search | @modelcontextprotocol/server-brave-search |
| Puppeteer | Browser automation | @modelcontextprotocol/server-puppeteer |

## Next Steps

- Configure cloud providers: [AWS MCP](../mcp-servers/aws-mcp-setup.md), [Azure MCP](../mcp-servers/azure-mcp-setup.md), [GCP MCP](../mcp-servers/gcp-mcp-setup.md)
- Learn prompting: [AI Agent Prompting Guide](./ai-agent-prompting-guide.md)
- Practice IaC: [Terraform Labs](../labs/)

## Official Resources

- Windsurf Documentation: https://codeium.com/windsurf
- MCP Specification: https://modelcontextprotocol.io
- MCP Servers: https://github.com/modelcontextprotocol/servers

---

**Level up your AI skills.** Visit [terraformacademy.app](https://terraformacademy.app) for AI certification prep including AWS AI Practitioner, Azure AI Fundamentals, and GCP Generative AI.
