# OpenAI API Setup for VS Code and IDEs

A comprehensive guide to setting up and using the OpenAI API for AI assisted development in VS Code and other IDEs.

## What is the OpenAI API?

The OpenAI API provides access to GPT-4, GPT-3.5, DALL-E, Whisper, and embedding models. It's the foundation for many AI coding assistants and can be integrated into IDEs for code generation, review, and explanation.

## Prerequisites

- OpenAI account with API access
- Payment method added (API is paid per use)
- Node.js or Python for SDK usage

## Step 1: Get API Key

1. Visit https://platform.openai.com
2. Sign in or create an account
3. Navigate to API Keys
4. Click "Create new secret key"
5. Copy and store the key securely (it won't be shown again)

## Step 2: Set Up Billing

1. Go to Settings then Billing
2. Add payment method
3. Set usage limits (recommended for cost control)
4. Optional: Set up usage alerts

## Step 3: Environment Configuration

### macOS/Linux

Add to `~/.zshrc` or `~/.bashrc`:

```bash
export OPENAI_API_KEY="sk-your-api-key-here"
```

Reload:

```bash
source ~/.zshrc
```

### Windows PowerShell

```powershell
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-your-api-key-here", "User")
```

### Windows Command Prompt

```cmd
setx OPENAI_API_KEY "sk-your-api-key-here"
```

## Step 4: Basic API Usage

### Python

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI()  # Uses OPENAI_API_KEY env var

response = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Write a Python function to parse JSON."}
    ],
    max_tokens=1000
)

print(response.choices[0].message.content)
```

### Node.js

```bash
npm install openai
```

```javascript
const OpenAI = require('openai');

const openai = new OpenAI();  // Uses OPENAI_API_KEY env var

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You are a helpful coding assistant.' },
      { role: 'user', content: 'Write a Python function to parse JSON.' }
    ],
    max_tokens: 1000
  });

  console.log(response.choices[0].message.content);
}

main();
```

### cURL

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4-turbo-preview",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

## VS Code Integration

### Option 1: Continue Extension

1. Install Continue extension from VS Code Marketplace
2. Configure `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "GPT-4 Turbo",
      "provider": "openai",
      "model": "gpt-4-turbo-preview",
      "apiKey": "sk-your-api-key"
    },
    {
      "title": "GPT-3.5 (Fast)",
      "provider": "openai",
      "model": "gpt-3.5-turbo",
      "apiKey": "sk-your-api-key"
    }
  ],
  "tabAutocompleteModel": {
    "title": "GPT-3.5",
    "provider": "openai",
    "model": "gpt-3.5-turbo"
  }
}
```

### Option 2: Cody

1. Install Sourcegraph Cody extension
2. Open settings
3. Configure OpenAI as provider
4. Add API key

### Option 3: Custom MCP Server

See [MCP Server VS Code Setup](./mcp-server-vscode-setup.md) for MCP integration.

## Windsurf Integration

Configure in `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "openai": {
      "command": "npx",
      "args": ["-y", "mcp-openai"],
      "env": {
        "OPENAI_API_KEY": "sk-your-api-key"
      }
    }
  }
}
```

## Streaming Responses

```python
from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[{"role": "user", "content": "Explain Kubernetes architecture."}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## Function Calling

```python
from openai import OpenAI
import json

client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"}
                },
                "required": ["location"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[{"role": "user", "content": "What's the weather in Seattle?"}],
    tools=tools
)

print(response.choices[0].message.tool_calls)
```

## Available Models

| Model | Context | Best For |
|-------|---------|----------|
| gpt-4-turbo-preview | 128K | Complex reasoning |
| gpt-4 | 8K | Reliable, tested |
| gpt-4-32k | 32K | Long documents |
| gpt-3.5-turbo | 16K | Fast, cost effective |
| gpt-3.5-turbo-instruct | 4K | Simple completions |

## Pricing (as of 2024)

| Model | Input | Output |
|-------|-------|--------|
| gpt-4-turbo | $10/1M tokens | $30/1M tokens |
| gpt-4 | $30/1M tokens | $60/1M tokens |
| gpt-3.5-turbo | $0.50/1M tokens | $1.50/1M tokens |

Check current pricing at: https://openai.com/pricing

## Cost Control

### Set Usage Limits

In OpenAI dashboard:

1. Go to Settings then Limits
2. Set monthly budget
3. Configure usage alerts

### Code Side Limits

```python
response = client.chat.completions.create(
    model="gpt-3.5-turbo",  # Use cheaper model
    messages=[...],
    max_tokens=500,  # Limit output length
    temperature=0.7  # Lower for more focused responses
)
```

## Troubleshooting

### Invalid API Key

```
AuthenticationError: Incorrect API key provided
```

Solution: Verify key is correct and active in OpenAI dashboard.

### Rate Limit

```
RateLimitError: Rate limit reached
```

Solution: Implement exponential backoff:

```python
import time
from openai import RateLimitError

def call_with_retry(func, max_retries=3):
    for i in range(max_retries):
        try:
            return func()
        except RateLimitError:
            time.sleep(2 ** i)
    raise Exception("Max retries exceeded")
```

### Context Length Exceeded

```
InvalidRequestError: This model's maximum context length is 8192 tokens
```

Solution: Truncate input or use a model with larger context.

## Security Best Practices

1. **Never commit API keys**: Use environment variables or secrets management
2. **Rotate keys regularly**: Create new keys and deprecate old ones
3. **Set spending limits**: Prevent unexpected charges
4. **Use organization features**: Manage team access properly
5. **Monitor usage**: Check dashboard for unusual activity

## Next Steps

- Configure MCP servers: [VS Code MCP](./mcp-server-vscode-setup.md), [Windsurf MCP](./mcp-server-windsurf-setup.md)
- Learn prompting: [AI Agent Prompting Guide](./ai-agent-prompting-guide.md)
- Explore cloud alternatives: [AWS Bedrock](./aws-bedrock-api-setup.md), [Azure OpenAI](./azure-openai-api-setup.md)

## Official Resources

- OpenAI Documentation: https://platform.openai.com/docs
- API Reference: https://platform.openai.com/docs/api-reference
- Cookbook: https://cookbook.openai.com
- Python SDK: https://github.com/openai/openai-python
- Node.js SDK: https://github.com/openai/openai-node

---

**Master AI for development.** Visit [terraformacademy.app](https://terraformacademy.app) for AI certification prep including AWS AI Practitioner, Azure AI Fundamentals, and GCP Generative AI.
