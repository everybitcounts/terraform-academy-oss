# Anthropic Claude API Setup Guide

A comprehensive guide to setting up and using the Anthropic Claude API for AI assisted development in your applications and IDEs.

## What is Claude?

Claude is Anthropic's AI assistant, known for:

- Strong reasoning and analysis
- Long context windows (up to 200K tokens)
- Code generation and review
- Constitutional AI safety approach
- Available via direct API and cloud providers (AWS Bedrock, GCP Vertex AI)

## Prerequisites

- Anthropic account with API access
- Payment method added
- Python 3.7+ or Node.js 14+

## Step 1: Get API Key

1. Visit https://console.anthropic.com
2. Sign in or create an account
3. Navigate to API Keys
4. Click "Create Key"
5. Copy and store the key securely

## Step 2: Environment Configuration

### macOS/Linux

Add to `~/.zshrc` or `~/.bashrc`:

```bash
export ANTHROPIC_API_KEY="sk-ant-your-api-key-here"
```

Reload:

```bash
source ~/.zshrc
```

### Windows PowerShell

```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-your-api-key-here", "User")
```

## Step 3: Basic API Usage

### Python

```bash
pip install anthropic
```

```python
import anthropic

client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY env var

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain Terraform modules in simple terms."}
    ]
)

print(message.content[0].text)
```

### With System Prompt

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system="You are an expert DevOps engineer. Provide practical, production ready advice.",
    messages=[
        {"role": "user", "content": "How should I structure a Terraform project for multiple environments?"}
    ]
)

print(message.content[0].text)
```

### Node.js

```bash
npm install @anthropic-ai/sdk
```

```javascript
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic();

async function main() {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: 'Explain Terraform modules in simple terms.' }
    ]
  });

  console.log(message.content[0].text);
}

main();
```

### cURL

```bash
curl https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude!"}
    ]
  }'
```

## Step 4: Streaming Responses

```python
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a guide on AWS IAM best practices."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

## Step 5: Multi Turn Conversations

```python
import anthropic

client = anthropic.Anthropic()

conversation = []

def chat(user_message):
    conversation.append({"role": "user", "content": user_message})
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        system="You are a helpful cloud architecture assistant.",
        messages=conversation
    )
    
    assistant_message = response.content[0].text
    conversation.append({"role": "assistant", "content": assistant_message})
    
    return assistant_message

print(chat("What is a VPC?"))
print(chat("How do subnets work within it?"))
print(chat("What about security groups?"))
```

## VS Code Integration

### Continue Extension

Configure `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "Claude 3.5 Sonnet",
      "provider": "anthropic",
      "model": "claude-3-5-sonnet-20241022",
      "apiKey": "sk-ant-your-api-key"
    },
    {
      "title": "Claude 3 Haiku (Fast)",
      "provider": "anthropic",
      "model": "claude-3-haiku-20240307",
      "apiKey": "sk-ant-your-api-key"
    }
  ]
}
```

### Cursor IDE

Cursor has native Claude support:

1. Open Cursor Settings
2. Go to Models
3. Select Claude as provider
4. Add API key

## Windsurf Integration

Configure `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "claude": {
      "command": "npx",
      "args": ["-y", "mcp-anthropic"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-your-api-key"
      }
    }
  }
}
```

## Tool Use (Function Calling)

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_infrastructure_status",
        "description": "Get the current status of infrastructure resources",
        "input_schema": {
            "type": "object",
            "properties": {
                "resource_type": {
                    "type": "string",
                    "description": "Type of resource: ec2, rds, s3"
                },
                "region": {
                    "type": "string",
                    "description": "AWS region"
                }
            },
            "required": ["resource_type"]
        }
    }
]

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the status of our EC2 instances in us-east-1?"}]
)

print(response.content)
```

## Available Models

| Model | Context | Best For |
|-------|---------|----------|
| claude-3-5-sonnet-20241022 | 200K | Best balance of speed and capability |
| claude-3-opus-20240229 | 200K | Most capable, complex tasks |
| claude-3-sonnet-20240229 | 200K | Good balance |
| claude-3-haiku-20240307 | 200K | Fastest, simple tasks |

## Pricing (as of 2024)

| Model | Input | Output |
|-------|-------|--------|
| Claude 3.5 Sonnet | $3/1M tokens | $15/1M tokens |
| Claude 3 Opus | $15/1M tokens | $75/1M tokens |
| Claude 3 Sonnet | $3/1M tokens | $15/1M tokens |
| Claude 3 Haiku | $0.25/1M tokens | $1.25/1M tokens |

Check current pricing at: https://www.anthropic.com/pricing

## Vision Capabilities

```python
import anthropic
import base64

client = anthropic.Anthropic()

# From URL
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://example.com/architecture-diagram.png"
                    }
                },
                {
                    "type": "text",
                    "text": "Analyze this architecture diagram."
                }
            ]
        }
    ]
)

print(message.content[0].text)
```

## Troubleshooting

### Invalid API Key

```
AuthenticationError: Invalid API key
```

Solution: Verify key starts with `sk-ant-` and is active.

### Rate Limits

```
RateLimitError: Rate limit exceeded
```

Solution: Implement backoff:

```python
import time
from anthropic import RateLimitError

def call_with_retry(func, max_retries=3):
    for i in range(max_retries):
        try:
            return func()
        except RateLimitError:
            time.sleep(2 ** i)
    raise Exception("Max retries exceeded")
```

### Context Length

```
InvalidRequestError: prompt is too long
```

Solution: Truncate input or use summarization for long documents.

## Security Best Practices

1. **Environment variables**: Never hardcode API keys
2. **Key rotation**: Regularly create new keys
3. **Usage monitoring**: Track API usage in console
4. **Rate limiting**: Implement client side rate limiting
5. **Content filtering**: Review model outputs for sensitive data

## Cloud Provider Alternatives

Claude is also available through:

- **AWS Bedrock**: See [AWS Bedrock Setup](./aws-bedrock-api-setup.md)
- **GCP Vertex AI**: Available as a partner model

These options provide:
- Enterprise features
- Private networking
- Integration with cloud IAM
- Consolidated billing

## Next Steps

- Configure MCP servers: [VS Code MCP](./mcp-server-vscode-setup.md), [Windsurf MCP](./mcp-server-windsurf-setup.md)
- Learn prompting: [AI Agent Prompting Guide](./ai-agent-prompting-guide.md)
- Cloud alternatives: [AWS Bedrock](./aws-bedrock-api-setup.md)

## Official Resources

- Anthropic Documentation: https://docs.anthropic.com
- API Reference: https://docs.anthropic.com/claude/reference
- Claude Cookbook: https://github.com/anthropics/anthropic-cookbook
- Python SDK: https://github.com/anthropics/anthropic-sdk-python

---

**Master AI for development.** Visit [terraformacademy.app](https://terraformacademy.app) for AI certification prep including AWS AI Practitioner, Azure AI Fundamentals, and GCP Generative AI.
