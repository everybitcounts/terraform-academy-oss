# AWS Bedrock API Setup Guide

A comprehensive guide to setting up and using Amazon Bedrock for generative AI in your applications and IDE integrations.

## What is Amazon Bedrock?

Amazon Bedrock is a fully managed service providing access to foundation models (FMs) from Amazon and leading AI companies through a unified API. Models include:

- Amazon Titan (text and embeddings)
- Anthropic Claude (text and vision)
- Meta Llama
- Mistral AI
- Stability AI (image generation)
- Cohere (text and embeddings)

## Prerequisites

- AWS account with Bedrock access
- AWS CLI installed and configured
- IAM permissions for Bedrock
- Supported AWS region (us-east-1, us-west-2, etc.)

## Step 1: Enable Model Access

Bedrock requires explicit model access requests:

1. Open AWS Console
2. Navigate to Amazon Bedrock
3. Select "Model access" in the left panel
4. Click "Manage model access"
5. Select the models you want to use
6. Submit access request (some models are instant, others require approval)

## Step 2: Configure IAM Permissions

### Create a Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream",
        "bedrock:ListFoundationModels",
        "bedrock:GetFoundationModel"
      ],
      "Resource": "*"
    }
  ]
}
```

### Attach to User or Role

```bash
aws iam create-policy \
  --policy-name BedrockAccess \
  --policy-document file://bedrock-policy.json

aws iam attach-user-policy \
  --user-name your-username \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/BedrockAccess
```

## Step 3: Configure AWS CLI

```bash
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Default region: us-east-1 (or your preferred Bedrock region)
# Default output format: json
```

Verify configuration:

```bash
aws bedrock list-foundation-models --region us-east-1
```

## Step 4: Basic API Usage

### Python (boto3)

```bash
pip install boto3
```

```python
import boto3
import json

# Create Bedrock runtime client
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'
)

# Invoke Claude model
response = bedrock.invoke_model(
    modelId='anthropic.claude-3-sonnet-20240229-v1:0',
    contentType='application/json',
    accept='application/json',
    body=json.dumps({
        'anthropic_version': 'bedrock-2023-05-31',
        'max_tokens': 1024,
        'messages': [
            {
                'role': 'user',
                'content': 'Explain AWS VPC in simple terms.'
            }
        ]
    })
)

result = json.loads(response['body'].read())
print(result['content'][0]['text'])
```

### Node.js

```bash
npm install @aws-sdk/client-bedrock-runtime
```

```javascript
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const client = new BedrockRuntimeClient({ region: 'us-east-1' });

async function invokeModel() {
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: 'Explain AWS VPC in simple terms.'
        }
      ]
    })
  });

  const response = await client.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.body));
  console.log(result.content[0].text);
}

invokeModel();
```

## Step 5: Streaming Responses

```python
import boto3
import json

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model_with_response_stream(
    modelId='anthropic.claude-3-sonnet-20240229-v1:0',
    contentType='application/json',
    accept='application/json',
    body=json.dumps({
        'anthropic_version': 'bedrock-2023-05-31',
        'max_tokens': 1024,
        'messages': [{'role': 'user', 'content': 'Write a poem about cloud computing.'}]
    })
)

for event in response['body']:
    chunk = json.loads(event['chunk']['bytes'])
    if chunk['type'] == 'content_block_delta':
        print(chunk['delta'].get('text', ''), end='', flush=True)
```

## IDE Integration

### VS Code with Continue

1. Install Continue extension
2. Configure `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "Claude via Bedrock",
      "provider": "bedrock",
      "model": "anthropic.claude-3-sonnet-20240229-v1:0",
      "region": "us-east-1"
    }
  ]
}
```

### Environment Variables

Set for IDE and terminal access:

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

## Available Models

| Model | ID | Use Case |
|-------|-------|----------|
| Claude 3 Sonnet | anthropic.claude-3-sonnet-20240229-v1:0 | General purpose |
| Claude 3 Haiku | anthropic.claude-3-haiku-20240307-v1:0 | Fast responses |
| Titan Text | amazon.titan-text-express-v1 | Cost effective |
| Llama 3 70B | meta.llama3-70b-instruct-v1:0 | Open weights |
| Mistral Large | mistral.mistral-large-2402-v1:0 | European option |

## Pricing Considerations

Bedrock uses pay per use pricing based on:
- Input tokens
- Output tokens
- Model selected

Check current pricing at: https://aws.amazon.com/bedrock/pricing/

## Troubleshooting

### Access Denied

```
AccessDeniedException: User is not authorized to perform bedrock:InvokeModel
```

Solution: Verify IAM policy is attached and model access is enabled.

### Model Not Found

```
ResourceNotFoundException: Could not find model
```

Solution: Check model ID and region. Not all models are available in all regions.

### Throttling

```
ThrottlingException: Rate exceeded
```

Solution: Implement exponential backoff or request quota increase.

## Security Best Practices

1. **Use IAM roles**: Avoid long term credentials
2. **Enable CloudTrail**: Log all Bedrock API calls
3. **VPC endpoints**: Use PrivateLink for private access
4. **Least privilege**: Only grant needed model access

## Next Steps

- Set up MCP for Bedrock: See [AWS MCP Setup](../mcp-servers/aws-mcp-setup.md)
- Prepare for certification: [AWS AI Practitioner (AIF-C01)](https://terraformacademy.app)
- Explore other providers: [Azure OpenAI](./azure-openai-api-setup.md), [GCP Vertex AI](./gcp-vertex-ai-api-setup.md)

## Official Resources

- Amazon Bedrock Documentation: https://docs.aws.amazon.com/bedrock/
- Bedrock User Guide: https://docs.aws.amazon.com/bedrock/latest/userguide/
- AWS SDK for Python: https://boto3.amazonaws.com/v1/documentation/api/latest/

---

**Master AWS AI services.** Get certified with the AWS AI Practitioner (AIF-C01) exam prep at [terraformacademy.app](https://terraformacademy.app).
