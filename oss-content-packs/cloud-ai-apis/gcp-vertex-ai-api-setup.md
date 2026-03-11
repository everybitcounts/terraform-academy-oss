# GCP Vertex AI API Setup Guide

A comprehensive guide to setting up and using Google Cloud Vertex AI for generative AI in your applications and IDE integrations.

## What is Vertex AI?

Vertex AI is Google Cloud's unified machine learning platform providing access to:

- Gemini models (text, vision, multimodal)
- PaLM 2 models
- Codey (code generation)
- Imagen (image generation)
- Custom model training and deployment

## Prerequisites

- Google Cloud account with billing enabled
- gcloud CLI installed
- Project with Vertex AI API enabled
- IAM permissions for Vertex AI

## Step 1: Create a Project and Enable APIs

### Google Cloud Console

1. Go to console.cloud.google.com
2. Create a new project or select existing
3. Navigate to "APIs and Services" then "Enable APIs"
4. Search for and enable:
   - Vertex AI API
   - Cloud Resource Manager API

### gcloud CLI

```bash
# Login
gcloud auth login

# Create project
gcloud projects create my-ai-project --name="My AI Project"

# Set project
gcloud config set project my-ai-project

# Enable APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

## Step 2: Configure Authentication

### Service Account (Recommended for Applications)

```bash
# Create service account
gcloud iam service-accounts create vertex-ai-sa \
  --display-name="Vertex AI Service Account"

# Grant permissions
gcloud projects add-iam-policy-binding my-ai-project \
  --member="serviceAccount:vertex-ai-sa@my-ai-project.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# Create key file
gcloud iam service-accounts keys create vertex-ai-key.json \
  --iam-account=vertex-ai-sa@my-ai-project.iam.gserviceaccount.com
```

### Application Default Credentials (Local Development)

```bash
gcloud auth application-default login
```

## Step 3: Basic API Usage

### Python

```bash
pip install google-cloud-aiplatform
```

```python
import vertexai
from vertexai.generative_models import GenerativeModel

# Initialize Vertex AI
vertexai.init(project="my-ai-project", location="us-central1")

# Create model instance
model = GenerativeModel("gemini-1.5-pro")

# Generate content
response = model.generate_content("Explain Google Cloud VPC networking.")

print(response.text)
```

### With Chat

```python
import vertexai
from vertexai.generative_models import GenerativeModel

vertexai.init(project="my-ai-project", location="us-central1")

model = GenerativeModel("gemini-1.5-pro")
chat = model.start_chat()

response = chat.send_message("What is Cloud Run?")
print(response.text)

response = chat.send_message("How does it compare to Cloud Functions?")
print(response.text)
```

### Node.js

```bash
npm install @google-cloud/vertexai
```

```javascript
const { VertexAI } = require('@google-cloud/vertexai');

const vertexAI = new VertexAI({
  project: 'my-ai-project',
  location: 'us-central1'
});

const model = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-pro'
});

async function main() {
  const result = await model.generateContent('Explain Google Cloud VPC networking.');
  console.log(result.response.candidates[0].content.parts[0].text);
}

main();
```

### REST API (cURL)

```bash
# Get access token
ACCESS_TOKEN=$(gcloud auth print-access-token)

# Call Gemini API
curl -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/my-ai-project/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent" \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "Explain Google Cloud VPC networking."}]
    }]
  }'
```

## Step 4: Streaming Responses

```python
import vertexai
from vertexai.generative_models import GenerativeModel

vertexai.init(project="my-ai-project", location="us-central1")

model = GenerativeModel("gemini-1.5-pro")

responses = model.generate_content(
    "Write a detailed guide on GKE architecture.",
    stream=True
)

for response in responses:
    print(response.text, end="", flush=True)
```

## Step 5: Multimodal (Vision)

```python
import vertexai
from vertexai.generative_models import GenerativeModel, Part

vertexai.init(project="my-ai-project", location="us-central1")

model = GenerativeModel("gemini-1.5-pro")

# From Cloud Storage
image = Part.from_uri(
    "gs://my-bucket/architecture-diagram.png",
    mime_type="image/png"
)

response = model.generate_content([
    "Analyze this architecture diagram and identify potential improvements.",
    image
])

print(response.text)
```

## IDE Integration

### VS Code with Continue

Configure `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "Gemini Pro via Vertex AI",
      "provider": "google-palm",
      "model": "gemini-1.5-pro",
      "projectId": "my-ai-project",
      "region": "us-central1"
    }
  ]
}
```

### Environment Variables

```bash
export GOOGLE_CLOUD_PROJECT="my-ai-project"
export GOOGLE_CLOUD_LOCATION="us-central1"
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/vertex-ai-key.json"
```

## Available Models

| Model | Capability | Best For |
|-------|------------|----------|
| gemini-1.5-pro | Multimodal, long context | Complex reasoning |
| gemini-1.5-flash | Multimodal, fast | Quick responses |
| gemini-1.0-pro | Text | General tasks |
| gemini-1.0-pro-vision | Vision | Image analysis |
| text-bison | Text | Legacy, cost effective |
| code-bison | Code | Code generation |
| codechat-bison | Code chat | Code assistance |
| textembedding-gecko | Embeddings | Search, RAG |

## Supported Regions

| Region | Location |
|--------|----------|
| us-central1 | Iowa |
| us-east1 | South Carolina |
| us-west1 | Oregon |
| europe-west1 | Belgium |
| europe-west4 | Netherlands |
| asia-northeast1 | Tokyo |
| asia-southeast1 | Singapore |

## Pricing Considerations

Pricing is based on:
- Characters processed (input and output)
- Model tier (Gemini Pro vs Flash)
- Image and video input

Check current pricing at: https://cloud.google.com/vertex-ai/pricing

## Safety Settings

```python
from vertexai.generative_models import GenerativeModel, HarmCategory, HarmBlockThreshold

model = GenerativeModel(
    "gemini-1.5-pro",
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    }
)
```

## Troubleshooting

### Permission Denied

```
PermissionDenied: IAM permission 'aiplatform.endpoints.predict' denied
```

Solution: Grant the `roles/aiplatform.user` role to your service account or user.

### API Not Enabled

```
ServiceException: Vertex AI API has not been used in project
```

Solution: Enable the Vertex AI API:
```bash
gcloud services enable aiplatform.googleapis.com
```

### Quota Exceeded

```
ResourceExhausted: Quota exceeded
```

Solution: Request quota increase in Cloud Console or implement rate limiting.

### Region Not Supported

```
InvalidArgument: Location is not supported
```

Solution: Use a supported region like `us-central1`.

## Security Best Practices

1. **Use Service Accounts**: Avoid using user credentials in production
2. **Least Privilege**: Only grant needed IAM roles
3. **VPC Service Controls**: Configure for sensitive workloads
4. **Audit Logging**: Enable Cloud Audit Logs
5. **Key Rotation**: Regularly rotate service account keys

## Next Steps

- Set up MCP for GCP: See [GCP MCP Setup](../mcp-servers/gcp-mcp-setup.md)
- Prepare for certification: [GCP Generative AI](https://terraformacademy.app)
- Explore other providers: [AWS Bedrock](./aws-bedrock-api-setup.md), [Azure OpenAI](./azure-openai-api-setup.md)

## Official Resources

- Vertex AI Documentation: https://cloud.google.com/vertex-ai/docs
- Generative AI on Vertex: https://cloud.google.com/vertex-ai/generative-ai/docs
- Python SDK: https://cloud.google.com/python/docs/reference/aiplatform/latest
- Gemini API: https://ai.google.dev/gemini-api/docs

---

**Master Google Cloud AI services.** Get certified with the GCP Generative AI exam prep at [terraformacademy.app](https://terraformacademy.app).
