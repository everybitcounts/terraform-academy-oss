# Terraform Fundamentals Content Pack

A starter question bank covering core Terraform concepts for the Terraform Academy OSS quiz engine.

## Contents

- 25 multiple choice questions
- Covers 7 knowledge domains
- Beginner difficulty level
- Estimated completion time: 30 minutes
- Passing score: 70%

## Domains Covered

| Domain | Questions |
|--------|-----------|
| Core Concepts | 2 |
| CLI Commands | 6 |
| Configuration | 7 |
| State Management | 4 |
| Variables | 4 |
| Modules | 1 |
| Functions | 1 |

## Usage

```javascript
import { TerraformFundamentalsQuestions } from './questions.js';

QuizEngine.init({
  title: TerraformFundamentalsQuestions.title,
  modules: [{
    name: 'Terraform Fundamentals',
    questions: TerraformFundamentalsQuestions.questions
  }],
  timer: true,
  timerMinutes: 30,
  passingScore: 70
});
```

## Related Resources

- HashiCorp Learn: https://developer.hashicorp.com/terraform/tutorials
- Terraform Documentation: https://developer.hashicorp.com/terraform/docs

## Want More?

This content pack includes 25 questions. For comprehensive certification prep:

- **Terraform Academy PRO**: 200+ questions with detailed explanations
- **Terraform Academy MAX**: Full certification paths, hands on labs, AI coaching, and achievement tracking

Visit https://terraformacademy.com or https://terraformacademy.app

## License

MIT License. See LICENSE file in repository root.
