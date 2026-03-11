# Cloud AI API Guides

Setup guides for cloud AI APIs and SDK integration.

## Available Guides

| Provider | Guide | Services Covered |
|----------|-------|------------------|
| AWS | [aws-bedrock-api-setup.md](./aws-bedrock-api-setup.md) | Bedrock, Claude, Titan |
| Azure | [azure-openai-api-setup.md](./azure-openai-api-setup.md) | Azure OpenAI Service, GPT-4, GPT-4o |
| GCP | [gcp-vertex-ai-api-setup.md](./gcp-vertex-ai-api-setup.md) | Vertex AI, Gemini |
| OpenAI | [openai-api-vscode-integration.md](./openai-api-vscode-integration.md) | GPT-4, GPT-4o, gpt-4.1 |
| Anthropic | [anthropic-claude-api-setup.md](./anthropic-claude-api-setup.md) | Claude 3.5, Claude 4, tool use |

## Quick Comparison

| Provider | Best For | Pricing Model |
|----------|----------|---------------|
| AWS Bedrock | Enterprise, multi model access | Per token |
| Azure OpenAI | Enterprise compliance, GPT integration | Per token |
| GCP Vertex AI | Google ecosystem, Gemini models | Per character/token |
| OpenAI | Direct access, latest models | Per token |
| Anthropic | Claude models, long context | Per token |

## Quick Start Examples

### OpenAI

```javascript
const { OpenAI } = require('openai');
const client = new OpenAI();

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

### Anthropic Claude

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic();

const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

### AWS Bedrock

```javascript
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const client = new BedrockRuntimeClient({ region: 'us-east-1' });

const response = await client.send(new InvokeModelCommand({
  modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
  body: JSON.stringify({
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Hello!' }]
  })
}));
```

## IDE Integration

For AI assistant integration in your IDE, see the [AI Tooling](../ai-tooling/) guides:

- [VS Code MCP Setup](../ai-tooling/mcp-server-vscode-setup.md)
- [Windsurf MCP Setup](../ai-tooling/mcp-server-windsurf-setup.md)

## MCP Server Configs

For cloud provider MCP integration:

- [AWS MCP Setup](../mcp-servers/aws-mcp-setup.md)
- [Azure MCP Setup](../mcp-servers/azure-mcp-setup.md)
- [GCP MCP Setup](../mcp-servers/gcp-mcp-setup.md)

## Contributing

These guides are part of the Terraform Academy open source content packs. Contributions welcome via pull request.

---

**Master AI integration.** Get certified at [terraformacademy.app](https://terraformacademy.app) with AWS AI Practitioner, Azure AI Fundamentals, and GCP Generative AI exam prep.
