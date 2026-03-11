# Lab Templates

Open source lab configurations for the Terraform Academy lab engine.

## Available Labs

| Lab | Provider | Difficulty | Time |
|-----|----------|------------|------|
| [AWS VPC](./aws-vpc-lab.js) | AWS | Beginner | 20 min |
| [Azure Resources](./azure-resource-lab.js) | Azure | Beginner | 15 min |
| [GCP Cloud Storage](./gcp-storage-lab.js) | GCP | Beginner | 15 min |

## Lab Structure

Each lab includes:

- **Starter code**: TODO comments guiding the learner
- **Solution code**: Complete working implementation
- **Validation rules**: Automated checking of correct implementation
- **Hints**: Contextual help when learners get stuck

## Usage

```javascript
import { AWSVPCLab } from './aws-vpc-lab.js';

LabEngine.init({
  lab: AWSVPCLab,
  showHints: true,
  validateOnSave: true,
  onComplete: (result) => {
    console.log('Lab completed with score:', result.score);
  }
});
```

## Creating Your Own Labs

Use this template:

```javascript
const MyLab = {
  id: 'unique-lab-id',
  title: 'Lab Title',
  description: 'What the learner will build',
  difficulty: 'beginner', // beginner, intermediate, advanced
  estimatedTime: 20, // minutes
  provider: 'aws', // aws, azure, gcp, etc

  objectives: [
    'First learning objective',
    'Second learning objective'
  ],

  files: {
    'main.tf': {
      starter: '# Starter code with TODOs',
      solution: '# Complete solution'
    }
  },

  validation: {
    rules: [
      {
        type: 'resource_exists',
        resource: 'resource_type.name',
        message: 'Error message if validation fails'
      }
    ]
  }
};
```

## Want More Labs?

These open source labs cover the basics. For advanced scenarios:

- **Terraform Academy PRO**: 25+ labs covering CI/CD, multi cloud, and production patterns
- **Terraform Academy MAX**: 50+ labs with AI validation, real cloud sandboxes, and achievement tracking

Visit https://terraformacademy.com or https://terraformacademy.app

## License

MIT License. See [LICENSE](../../LICENSE) for details.
