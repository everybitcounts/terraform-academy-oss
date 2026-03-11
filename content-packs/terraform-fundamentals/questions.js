/**
 * Terraform Fundamentals Question Bank
 * Open Source Content Pack for Terraform Academy OSS
 * 
 * 25 questions covering core Terraform concepts
 * Suitable for beginners preparing for HashiCorp Terraform Associate
 * 
 * License: MIT
 * More questions available at https://terraformacademy.com (PRO) and https://terraformacademy.app (MAX)
 */

const TerraformFundamentalsQuestions = {
  id: 'terraform-fundamentals',
  title: 'Terraform Fundamentals',
  description: 'Core concepts for infrastructure as code with Terraform',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 30,
  passingScore: 70,

  questions: [
    {
      id: 'tf-001',
      question: 'What is the primary purpose of Terraform?',
      options: [
        'Container orchestration',
        'Infrastructure as Code provisioning',
        'Application deployment',
        'Log management'
      ],
      correctAnswer: 1,
      explanation: 'Terraform is an Infrastructure as Code (IaC) tool that allows you to define and provision infrastructure using a declarative configuration language.',
      domain: 'Core Concepts'
    },
    {
      id: 'tf-002',
      question: 'Which file extension is used for Terraform configuration files?',
      options: [
        '.yaml',
        '.json',
        '.tf',
        '.config'
      ],
      correctAnswer: 2,
      explanation: 'Terraform configuration files use the .tf extension and are written in HashiCorp Configuration Language (HCL).',
      domain: 'Core Concepts'
    },
    {
      id: 'tf-003',
      question: 'What command initializes a Terraform working directory?',
      options: [
        'terraform start',
        'terraform init',
        'terraform begin',
        'terraform setup'
      ],
      correctAnswer: 1,
      explanation: 'The terraform init command initializes a working directory containing Terraform configuration files and downloads required providers.',
      domain: 'CLI Commands'
    },
    {
      id: 'tf-004',
      question: 'Which block type defines a cloud provider in Terraform?',
      options: [
        'resource',
        'module',
        'provider',
        'variable'
      ],
      correctAnswer: 2,
      explanation: 'The provider block configures the specified provider (AWS, Azure, GCP, etc.) and is responsible for understanding API interactions.',
      domain: 'Configuration'
    },
    {
      id: 'tf-005',
      question: 'What is the purpose of terraform plan?',
      options: [
        'Apply infrastructure changes immediately',
        'Preview changes before applying them',
        'Destroy all resources',
        'Initialize the working directory'
      ],
      correctAnswer: 1,
      explanation: 'The terraform plan command creates an execution plan showing what actions Terraform will take to reach the desired state.',
      domain: 'CLI Commands'
    },
    {
      id: 'tf-006',
      question: 'Where does Terraform store the state of managed infrastructure by default?',
      options: [
        'In memory only',
        'terraform.tfstate file',
        'Cloud provider API',
        '.terraform directory'
      ],
      correctAnswer: 1,
      explanation: 'By default, Terraform stores state locally in a file named terraform.tfstate. Remote backends can be configured for team collaboration.',
      domain: 'State Management'
    },
    {
      id: 'tf-007',
      question: 'What is a Terraform module?',
      options: [
        'A type of variable',
        'A container for multiple resources defined together',
        'A cloud provider plugin',
        'A state file backup'
      ],
      correctAnswer: 1,
      explanation: 'A module is a container for multiple resources that are used together. Modules promote reusability and organization.',
      domain: 'Modules'
    },
    {
      id: 'tf-008',
      question: 'Which command applies the planned changes to infrastructure?',
      options: [
        'terraform deploy',
        'terraform apply',
        'terraform execute',
        'terraform run'
      ],
      correctAnswer: 1,
      explanation: 'The terraform apply command executes the actions proposed in a Terraform plan to create, update, or destroy infrastructure.',
      domain: 'CLI Commands'
    },
    {
      id: 'tf-009',
      question: 'What is the purpose of the terraform.lock.hcl file?',
      options: [
        'Store sensitive variables',
        'Lock provider versions for consistency',
        'Encrypt state files',
        'Define input variables'
      ],
      correctAnswer: 1,
      explanation: 'The .terraform.lock.hcl file records the provider versions used, ensuring consistent installations across team members.',
      domain: 'Configuration'
    },
    {
      id: 'tf-010',
      question: 'How do you reference an attribute of a resource in Terraform?',
      options: [
        '${resource.name.attribute}',
        'resource.type.name.attribute',
        'resource_type.resource_name.attribute',
        '@resource.name.attribute'
      ],
      correctAnswer: 2,
      explanation: 'Resource attributes are referenced using the syntax resource_type.resource_name.attribute, such as aws_instance.web.id.',
      domain: 'Configuration'
    },
    {
      id: 'tf-011',
      question: 'What does terraform destroy do?',
      options: [
        'Removes the state file',
        'Terminates all managed infrastructure',
        'Deletes configuration files',
        'Resets provider credentials'
      ],
      correctAnswer: 1,
      explanation: 'The terraform destroy command terminates all resources defined in your Terraform configuration.',
      domain: 'CLI Commands'
    },
    {
      id: 'tf-012',
      question: 'Which block is used to define input parameters for a Terraform configuration?',
      options: [
        'input',
        'parameter',
        'variable',
        'argument'
      ],
      correctAnswer: 2,
      explanation: 'The variable block defines input variables that make configurations flexible and reusable.',
      domain: 'Variables'
    },
    {
      id: 'tf-013',
      question: 'What is the purpose of the output block in Terraform?',
      options: [
        'Define logging settings',
        'Export values from the configuration',
        'Set environment variables',
        'Configure notifications'
      ],
      correctAnswer: 1,
      explanation: 'Output blocks export information about your infrastructure that can be used by other configurations or displayed after apply.',
      domain: 'Variables'
    },
    {
      id: 'tf-014',
      question: 'Which backend is commonly used for remote state storage?',
      options: [
        'local',
        's3',
        'file',
        'disk'
      ],
      correctAnswer: 1,
      explanation: 'The S3 backend stores state in an Amazon S3 bucket. Other popular options include Azure Blob Storage and Google Cloud Storage.',
      domain: 'State Management'
    },
    {
      id: 'tf-015',
      question: 'What is a data source in Terraform?',
      options: [
        'A way to create new resources',
        'A way to query existing infrastructure',
        'A database connection',
        'A backup mechanism'
      ],
      correctAnswer: 1,
      explanation: 'Data sources allow Terraform to query and use information defined outside of Terraform or managed by another configuration.',
      domain: 'Configuration'
    },
    {
      id: 'tf-016',
      question: 'Which argument makes a variable required in Terraform?',
      options: [
        'Setting required = true',
        'Omitting the default value',
        'Adding the mandatory keyword',
        'Using the required() function'
      ],
      correctAnswer: 1,
      explanation: 'A variable without a default value is required. Users must provide a value when running Terraform.',
      domain: 'Variables'
    },
    {
      id: 'tf-017',
      question: 'What command formats Terraform configuration files?',
      options: [
        'terraform lint',
        'terraform fmt',
        'terraform format',
        'terraform style'
      ],
      correctAnswer: 1,
      explanation: 'The terraform fmt command rewrites configuration files to a canonical format and style.',
      domain: 'CLI Commands'
    },
    {
      id: 'tf-018',
      question: 'What is the purpose of terraform validate?',
      options: [
        'Check provider credentials',
        'Verify configuration syntax and consistency',
        'Test network connectivity',
        'Validate state file integrity'
      ],
      correctAnswer: 1,
      explanation: 'The terraform validate command checks whether a configuration is syntactically valid and internally consistent.',
      domain: 'CLI Commands'
    },
    {
      id: 'tf-019',
      question: 'How can you pass variable values at runtime?',
      options: [
        'Using terraform.tfvars file only',
        'Using the var flag, tfvars files, or environment variables',
        'Hardcoding in configuration files only',
        'Through the Terraform Cloud console only'
      ],
      correctAnswer: 1,
      explanation: 'Variables can be set via command line flags, .tfvars files, environment variables (TF_VAR_name), or interactively.',
      domain: 'Variables'
    },
    {
      id: 'tf-020',
      question: 'What does the count meta argument do?',
      options: [
        'Counts existing resources',
        'Creates multiple instances of a resource',
        'Tracks resource versions',
        'Limits API calls'
      ],
      correctAnswer: 1,
      explanation: 'The count meta argument creates multiple instances of a resource based on a whole number value.',
      domain: 'Configuration'
    },
    {
      id: 'tf-021',
      question: 'Which lifecycle argument prevents resource destruction?',
      options: [
        'prevent_destroy',
        'no_delete',
        'immutable',
        'protected'
      ],
      correctAnswer: 0,
      explanation: 'Setting prevent_destroy = true in a lifecycle block causes Terraform to reject any plan that would destroy the resource.',
      domain: 'Configuration'
    },
    {
      id: 'tf-022',
      question: 'What is the purpose of terraform workspace?',
      options: [
        'Manage IDE settings',
        'Create isolated state environments',
        'Configure team permissions',
        'Set up development containers'
      ],
      correctAnswer: 1,
      explanation: 'Workspaces allow you to manage multiple distinct sets of infrastructure resources using the same configuration.',
      domain: 'State Management'
    },
    {
      id: 'tf-023',
      question: 'Which function converts a list to a set in Terraform?',
      options: [
        'list()',
        'set()',
        'toset()',
        'convert()'
      ],
      correctAnswer: 2,
      explanation: 'The toset() function converts a list to a set, removing duplicate values and the concept of ordering.',
      domain: 'Functions'
    },
    {
      id: 'tf-024',
      question: 'What happens during terraform refresh?',
      options: [
        'Reinstalls providers',
        'Updates state with real infrastructure',
        'Clears the cache',
        'Reloads configuration files'
      ],
      correctAnswer: 1,
      explanation: 'The terraform refresh command reads the current state of existing remote objects and updates the state file.',
      domain: 'State Management'
    },
    {
      id: 'tf-025',
      question: 'Which block defines dependencies between resources?',
      options: [
        'depends_on meta argument',
        'requires block',
        'dependency block',
        'link block'
      ],
      correctAnswer: 0,
      explanation: 'The depends_on meta argument explicitly specifies dependencies when Terraform cannot automatically determine them.',
      domain: 'Configuration'
    }
  ],

  domains: [
    { name: 'Core Concepts', count: 2 },
    { name: 'CLI Commands', count: 6 },
    { name: 'Configuration', count: 7 },
    { name: 'State Management', count: 4 },
    { name: 'Variables', count: 4 },
    { name: 'Modules', count: 1 },
    { name: 'Functions', count: 1 }
  ]
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TerraformFundamentalsQuestions;
}
