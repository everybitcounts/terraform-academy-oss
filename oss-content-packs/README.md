# Terraform Academy OSS Content Packs

Open source question banks, lab configurations, and guides for the Terraform Academy platform.

## Overview

These content packs provide starter resources for cloud and infrastructure learning:

- **Question Banks**: 100 curated questions across 4 certification domains
- **Lab Templates**: Hands on exercises for AWS, Azure, and GCP
- **Getting Started Guides**: Terraform installation for all platforms
- **AI Tooling Guides**: MCP server setup and AI prompting best practices
- **Cloud AI APIs**: Integration guides for Bedrock, Vertex AI, Azure OpenAI, and more
- **MCP Server Configs**: Cloud provider configurations for AI assistants

## Question Banks

| Pack | Questions | Domains | Difficulty |
|------|-----------|---------|------------|
| [Terraform Fundamentals](./terraform-fundamentals/) | 25 | 7 | Beginner |
| [AWS Cloud Basics](./aws-basics/) | 25 | 10 | Beginner |
| [Azure Cloud Basics](./azure-basics/) | 25 | 11 | Beginner |
| [GCP Cloud Basics](./gcp-basics/) | 25 | 12 | Beginner |

**Total: 100 questions across 4 content packs**

## Lab Templates

| Lab | Provider | Skills |
|-----|----------|--------|
| [AWS VPC Lab](./labs/aws-vpc-lab.js) | AWS | VPC, Subnets, Internet Gateway |
| [Azure Resources Lab](./labs/azure-resource-lab.js) | Azure | Resource Groups, Storage Accounts |
| [GCP Storage Lab](./labs/gcp-storage-lab.js) | GCP | Cloud Storage, Lifecycle Rules |

## Getting Started

| Platform | Guide |
|----------|-------|
| [macOS](./getting-started/terraform-install-macos.md) | Homebrew, manual, tfenv |
| [Linux](./getting-started/terraform-install-linux.md) | apt, yum, manual, tfenv, asdf |
| [Windows](./getting-started/terraform-install-windows.md) | Chocolatey, Winget, Scoop, manual |

## AI Tooling

| Topic | Guide |
|-------|-------|
| [VS Code MCP](./ai-tooling/mcp-server-vscode-setup.md) | MCP configuration for VS Code |
| [Windsurf MCP](./ai-tooling/mcp-server-windsurf-setup.md) | MCP configuration for Windsurf IDE |
| [AI Prompting](./ai-tooling/ai-agent-prompting-guide.md) | Best practices for AI assisted development |

## Cloud AI APIs

| Provider | Guide |
|----------|-------|
| [AWS Bedrock](./cloud-ai-apis/aws-bedrock-api-setup.md) | Bedrock, Claude, Titan |
| [Azure OpenAI](./cloud-ai-apis/azure-openai-api-setup.md) | Azure OpenAI Service, GPT-4 |
| [GCP Vertex AI](./cloud-ai-apis/gcp-vertex-ai-api-setup.md) | Vertex AI, Gemini |
| [OpenAI](./cloud-ai-apis/openai-api-vscode-integration.md) | GPT-4o, gpt-4.1 |
| [Anthropic](./cloud-ai-apis/anthropic-claude-api-setup.md) | Claude 3.5, Claude 4 |

## MCP Server Configurations

| Provider | Guide |
|----------|-------|
| [AWS](./mcp-servers/aws-mcp-setup.md) | CLI, S3, SSM, CloudWatch |
| [Azure](./mcp-servers/azure-mcp-setup.md) | CLI, Storage, DevOps, Key Vault |
| [GCP](./mcp-servers/gcp-mcp-setup.md) | gcloud, GCS, BigQuery |
| [Grafana](./mcp-servers/grafana-mcp-setup.md) | Dashboards, alerts, data sources |
| [Cloudflare](./mcp-servers/cloudflare-mcp-setup.md) | DNS, Workers, KV, D1 |

## Usage

### With Quiz Engine

```javascript
import { TerraformFundamentalsQuestions } from './terraform-fundamentals/questions.js';
import { AWSBasicsQuestions } from './aws-basics/questions.js';
import { AzureBasicsQuestions } from './azure-basics/questions.js';
import { GCPBasicsQuestions } from './gcp-basics/questions.js';

// Single pack
QuizEngine.init({
  title: 'Terraform Fundamentals',
  modules: [{
    name: 'Core Concepts',
    questions: TerraformFundamentalsQuestions.questions
  }]
});

// Combined multi cloud quiz
QuizEngine.init({
  title: 'Multi Cloud Fundamentals',
  modules: [
    { name: 'Terraform', questions: TerraformFundamentalsQuestions.questions },
    { name: 'AWS', questions: AWSBasicsQuestions.questions },
    { name: 'Azure', questions: AzureBasicsQuestions.questions },
    { name: 'GCP', questions: GCPBasicsQuestions.questions }
  ],
  shuffleQuestions: true,
  timer: true,
  timerMinutes: 60
});
```

### Standalone HTML

```html
<script src="terraform-fundamentals/questions.js"></script>
<script>
  console.log(TerraformFundamentalsQuestions.questions.length + ' questions loaded');
</script>
```

## Certification Alignment

| Content Pack | Certification Path |
|--------------|-------------------|
| Terraform Fundamentals | HashiCorp Terraform Associate |
| AWS Cloud Basics | AWS Cloud Practitioner |
| Azure Cloud Basics | Azure Fundamentals AZ-900 |
| GCP Cloud Basics | Google Cloud Digital Leader |

## Contributing

We welcome community contributions. See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on:

- Adding new questions
- Creating new content packs
- Reporting issues with question accuracy

### Question Format

```javascript
{
  id: 'unique-id',
  question: 'Question text',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0, // Zero indexed
  explanation: 'Why this answer is correct',
  domain: 'Knowledge Domain'
}
```

## Want More?

These open source packs contain 100 total questions. For comprehensive certification prep:

| Feature | OSS | PRO | MAX |
|---------|-----|-----|-----|
| Question Banks | 100 | 500+ | 1500+ |
| Hands On Labs | 3 | 25+ | 50+ |
| Certification Paths | 4 | 15+ | 25+ |
| AI Coaching | Limited | Yes | Unlimited |
| Achievement System | No | Basic | Full |
| PvP Battles | No | No | Yes |
| Discord Activity | No | No | Yes |
| Certificate Generation | No | Yes | Yes |

**PRO**: https://terraformacademy.com

**MAX**: https://terraformacademy.app

## License

MIT License. See [LICENSE](../LICENSE) for details.
