# Azure OpenAI API Setup Guide

A comprehensive guide to setting up and using Azure OpenAI Service for generative AI in your applications and IDE integrations.

## What is Azure OpenAI Service?

Azure OpenAI Service provides access to OpenAI models (GPT-4, GPT-4 Turbo, GPT-3.5, DALL-E, Whisper, Embeddings) with Azure enterprise features including:

- Private networking
- Regional availability
- Content filtering
- Managed identity integration
- Compliance certifications

## Prerequisites

- Azure subscription
- Azure OpenAI access approval (request at https://aka.ms/oai/access)
- Azure CLI installed
- Contributor role on subscription or resource group

## Step 1: Create Azure OpenAI Resource

### Azure Portal

1. Sign in to Azure Portal
2. Click "Create a resource"
3. Search for "Azure OpenAI"
4. Click "Create"
5. Configure:
   - Subscription: Your subscription
   - Resource group: Create new or select existing
   - Region: Select supported region (East US, West Europe, etc.)
   - Name: Unique resource name
   - Pricing tier: Standard S0
6. Click "Review + create" then "Create"

### Azure CLI

```bash
# Login
az login

# Create resource group
az group create --name rg-openai --location eastus

# Create Azure OpenAI resource
az cognitiveservices account create \
  --name my-openai-resource \
  --resource-group rg-openai \
  --kind OpenAI \
  --sku S0 \
  --location eastus
```

## Step 2: Deploy a Model

### Azure Portal

1. Open your Azure OpenAI resource
2. Click "Model deployments" then "Manage Deployments"
3. Click "Create new deployment"
4. Select model (e.g., gpt-4, gpt-35-turbo)
5. Enter deployment name
6. Configure tokens per minute rate limit
7. Click "Create"

### Azure CLI

```bash
az cognitiveservices account deployment create \
  --name my-openai-resource \
  --resource-group rg-openai \
  --deployment-name gpt-4-deployment \
  --model-name gpt-4 \
  --model-version "0613" \
  --model-format OpenAI \
  --sku-capacity 10 \
  --sku-name Standard
```

## Step 3: Get API Credentials

### Azure Portal

1. Open your Azure OpenAI resource
2. Go to "Keys and Endpoint"
3. Copy:
   - KEY 1 or KEY 2
   - Endpoint URL

### Azure CLI

```bash
# Get endpoint
az cognitiveservices account show \
  --name my-openai-resource \
  --resource-group rg-openai \
  --query "properties.endpoint" -o tsv

# Get key
az cognitiveservices account keys list \
  --name my-openai-resource \
  --resource-group rg-openai \
  --query "key1" -o tsv
```

## Step 4: Basic API Usage

### Python

```bash
pip install openai
```

```python
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key="your-api-key",
    api_version="2024-02-15-preview",
    azure_endpoint="https://your-resource.openai.azure.com"
)

response = client.chat.completions.create(
    model="gpt-4-deployment",  # Your deployment name
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain Azure Virtual Networks."}
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
const { AzureOpenAI } = require('openai');

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: '2024-02-15-preview',
  endpoint: 'https://your-resource.openai.azure.com'
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'gpt-4-deployment',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain Azure Virtual Networks.' }
    ],
    max_tokens: 1000
  });

  console.log(response.choices[0].message.content);
}

main();
```

### cURL

```bash
curl "https://your-resource.openai.azure.com/openai/deployments/gpt-4-deployment/chat/completions?api-version=2024-02-15-preview" \
  -H "Content-Type: application/json" \
  -H "api-key: your-api-key" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain Azure Virtual Networks."}
    ],
    "max_tokens": 1000
  }'
```

## Step 5: Streaming Responses

```python
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key="your-api-key",
    api_version="2024-02-15-preview",
    azure_endpoint="https://your-resource.openai.azure.com"
)

stream = client.chat.completions.create(
    model="gpt-4-deployment",
    messages=[{"role": "user", "content": "Write a poem about cloud computing."}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## IDE Integration

### VS Code with Continue

Configure `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "Azure OpenAI GPT-4",
      "provider": "openai",
      "model": "gpt-4-deployment",
      "apiBase": "https://your-resource.openai.azure.com/openai/deployments/gpt-4-deployment",
      "apiKey": "your-api-key",
      "apiType": "azure",
      "apiVersion": "2024-02-15-preview"
    }
  ]
}
```

### Environment Variables

```bash
export AZURE_OPENAI_API_KEY="your-api-key"
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com"
export AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4-deployment"
export AZURE_OPENAI_API_VERSION="2024-02-15-preview"
```

## Using Managed Identity

For Azure hosted applications:

```python
from azure.identity import DefaultAzureCredential
from openai import AzureOpenAI

credential = DefaultAzureCredential()
token = credential.get_token("https://cognitiveservices.azure.com/.default")

client = AzureOpenAI(
    api_key=token.token,
    api_version="2024-02-15-preview",
    azure_endpoint="https://your-resource.openai.azure.com"
)
```

## Available Models

| Model | Capability | Best For |
|-------|------------|----------|
| gpt-4-turbo | Latest GPT-4 | Complex reasoning |
| gpt-4 | GPT-4 | General tasks |
| gpt-35-turbo | GPT-3.5 | Fast, cost effective |
| text-embedding-ada-002 | Embeddings | Search, RAG |
| dall-e-3 | Image generation | Creative content |
| whisper | Speech to text | Transcription |

## Content Filtering

Azure OpenAI includes content filtering by default. Configure in Azure Portal:

1. Open your resource
2. Go to "Content filters"
3. Create custom filter or use default
4. Assign to deployment

## Pricing Considerations

Pricing is based on:
- Tokens processed (input and output)
- Model tier (GPT-4 vs GPT-3.5)
- Provisioned throughput (optional)

Check current pricing at: https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/

## Troubleshooting

### 401 Unauthorized

```
AuthenticationError: Incorrect API key provided
```

Solution: Verify API key is correct and not expired.

### 404 Deployment Not Found

```
NotFoundError: The API deployment for this resource does not exist
```

Solution: Check deployment name matches exactly.

### 429 Rate Limited

```
RateLimitError: Requests to the API have exceeded call rate limit
```

Solution: Implement retry logic or increase rate limits.

## Security Best Practices

1. **Use Key Vault**: Store API keys in Azure Key Vault
2. **Managed Identity**: Use managed identity when possible
3. **Private Endpoints**: Configure private networking
4. **RBAC**: Use role based access control
5. **Monitor usage**: Enable Azure Monitor for tracking

## Next Steps

- Set up MCP for Azure: See [Azure MCP Setup](../mcp-servers/azure-mcp-setup.md)
- Prepare for certification: [Azure AI Fundamentals (AI-900)](https://terraformacademy.app)
- Explore other providers: [AWS Bedrock](./aws-bedrock-api-setup.md), [GCP Vertex AI](./gcp-vertex-ai-api-setup.md)

## Official Resources

- Azure OpenAI Documentation: https://learn.microsoft.com/azure/ai-services/openai/
- REST API Reference: https://learn.microsoft.com/azure/ai-services/openai/reference
- Quickstarts: https://learn.microsoft.com/azure/ai-services/openai/quickstart

---

**Master Azure AI services.** Get certified with the Azure AI Fundamentals (AI-900) exam prep at [terraformacademy.app](https://terraformacademy.app).
