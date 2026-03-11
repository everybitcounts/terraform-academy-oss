# Terraform Academy OSS Content Packs

Open source question banks and lab configurations for the Terraform Academy quiz and lab engines.

## Overview

These content packs provide starter question banks for cloud and infrastructure certification prep. Each pack contains 25 curated questions covering fundamental concepts.

## Content Packs

| Pack | Questions | Domains | Difficulty |
|------|-----------|---------|------------|
| [Terraform Fundamentals](./terraform-fundamentals/) | 25 | 7 | Beginner |
| [AWS Cloud Basics](./aws-basics/) | 25 | 10 | Beginner |
| [Azure Cloud Basics](./azure-basics/) | 25 | 11 | Beginner |
| [GCP Cloud Basics](./gcp-basics/) | 25 | 12 | Beginner |

**Total: 100 questions across 4 content packs**

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
