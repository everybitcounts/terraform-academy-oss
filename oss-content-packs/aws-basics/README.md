# AWS Cloud Basics Content Pack

A starter question bank covering AWS fundamentals for the Terraform Academy OSS quiz engine.

## Contents

- 25 multiple choice questions
- Covers 10 knowledge domains
- Beginner difficulty level
- Estimated completion time: 30 minutes
- Passing score: 70%

## Domains Covered

| Domain | Questions |
|--------|-----------|
| Compute | 2 |
| Storage | 3 |
| Networking | 5 |
| Database | 2 |
| Security | 5 |
| Global Infrastructure | 2 |
| Management | 2 |
| Containers | 1 |
| Pricing | 2 |
| Application Integration | 1 |

## Usage

```javascript
import { AWSBasicsQuestions } from './questions.js';

QuizEngine.init({
  title: AWSBasicsQuestions.title,
  modules: [{
    name: 'AWS Cloud Basics',
    questions: AWSBasicsQuestions.questions
  }],
  timer: true,
  timerMinutes: 30,
  passingScore: 70
});
```

## Related Resources

- AWS Training: https://aws.amazon.com/training/
- AWS Documentation: https://docs.aws.amazon.com/

## Want More?

This content pack includes 25 questions. For comprehensive certification prep:

- **Terraform Academy PRO**: AWS Cloud Practitioner, Solutions Architect, and DevOps certification prep
- **Terraform Academy MAX**: Full certification paths with hands on labs, AI coaching, and achievement tracking

Visit https://terraformacademy.com or https://terraformacademy.app

## License

MIT License. See LICENSE file in repository root.
