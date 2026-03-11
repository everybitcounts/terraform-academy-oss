# Azure Cloud Basics Content Pack

A starter question bank covering Azure fundamentals for the Terraform Academy OSS quiz engine.

## Contents

- 25 multiple choice questions
- Covers 11 knowledge domains
- Beginner difficulty level
- Estimated completion time: 30 minutes
- Passing score: 70%

## Domains Covered

| Domain | Questions |
|--------|-----------|
| Core Architecture | 2 |
| Compute | 3 |
| Storage | 2 |
| Networking | 5 |
| Database | 2 |
| Identity | 1 |
| Security | 2 |
| Management | 5 |
| Containers | 1 |
| Pricing | 1 |
| Governance | 1 |

## Usage

```javascript
import { AzureBasicsQuestions } from './questions.js';

QuizEngine.init({
  title: AzureBasicsQuestions.title,
  modules: [{
    name: 'Azure Cloud Basics',
    questions: AzureBasicsQuestions.questions
  }],
  timer: true,
  timerMinutes: 30,
  passingScore: 70
});
```

## Related Resources

- Microsoft Learn: https://learn.microsoft.com/en-us/training/azure/
- Azure Documentation: https://learn.microsoft.com/en-us/azure/

## Want More?

This content pack includes 25 questions. For comprehensive certification prep:

- **Terraform Academy PRO**: Azure Fundamentals, Administrator, and DevOps certification prep
- **Terraform Academy MAX**: Full certification paths with hands on labs, AI coaching, and achievement tracking

Visit https://terraformacademy.com or https://terraformacademy.app

## License

MIT License. See LICENSE file in repository root.
