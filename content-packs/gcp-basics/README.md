# Google Cloud Basics Content Pack

A starter question bank covering Google Cloud Platform fundamentals for the Terraform Academy OSS quiz engine.

## Contents

- 25 multiple choice questions
- Covers 12 knowledge domains
- Beginner difficulty level
- Estimated completion time: 30 minutes
- Passing score: 70%

## Domains Covered

| Domain | Questions |
|--------|-----------|
| Core Infrastructure | 2 |
| Compute | 3 |
| Storage | 2 |
| Networking | 5 |
| Database | 2 |
| Security | 3 |
| Management | 3 |
| Containers | 1 |
| Pricing | 1 |
| Governance | 1 |
| Operations | 1 |
| Analytics | 1 |

## Usage

```javascript
import { GCPBasicsQuestions } from './questions.js';

QuizEngine.init({
  title: GCPBasicsQuestions.title,
  modules: [{
    name: 'Google Cloud Basics',
    questions: GCPBasicsQuestions.questions
  }],
  timer: true,
  timerMinutes: 30,
  passingScore: 70
});
```

## Related Resources

- Google Cloud Skills Boost: https://www.cloudskillsboost.google/
- Google Cloud Documentation: https://cloud.google.com/docs

## Want More?

This content pack includes 25 questions. For comprehensive certification prep:

- **Terraform Academy PRO**: Cloud Digital Leader, Cloud Engineer, and DevOps certification prep
- **Terraform Academy MAX**: Full certification paths with hands on labs, AI coaching, and achievement tracking

Visit https://terraformacademy.com or https://terraformacademy.app

## License

MIT License. See LICENSE file in repository root.
