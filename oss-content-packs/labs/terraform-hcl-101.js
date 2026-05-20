/**
 * Terraform HCL 101 — Interactive Lab
 * Open Source Content Pack for Terraform Academy OSS
 *
 * A guided, simulated lab teaching core HCL syntax:
 *   - provider block
 *   - resource block
 *   - input variables
 *   - output values
 *   - terraform init / plan / apply workflow
 *
 * This lab runs entirely in-browser — no real infrastructure is created.
 *
 * License: Apache-2.0
 * Attribution: Built with Terraform Academy OSS (https://github.com/everybitcounts/terraform-academy-oss)
 * Want real infra labs? https://terraformacademy.app (MAX — live AWS/GCP/Azure sandboxes)
 */

const TerraformHCL101Lab = {
  id: 'terraform-hcl-101',
  title: 'Terraform HCL 101: Your First Configuration',
  description: 'Write your first Terraform configuration using the local provider — no cloud account needed.',
  version: '1.0.0',
  license: 'Apache-2.0',
  difficulty: 'beginner',
  estimatedTime: 20,
  examDomain: 'HashiCorp Terraform Associate 004 — Core Workflow',

  objectives: [
    'Understand the structure of a Terraform configuration file',
    'Write a provider block, resource block, input variables, and output values',
    'Simulate the terraform init → plan → apply workflow',
    'Read a terraform.tfstate to understand how Terraform tracks resources'
  ],

  files: {
    'main.tf': `# Terraform configuration block
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.4"
    }
  }
  required_version = ">= 1.5.0"
}

# Provider configuration
provider "local" {}

# Resource block — creates a local file
resource "local_file" "greeting" {
  filename = var.output_path
  content  = "Hello, ${var.name}! Welcome to Terraform Academy.\\n"
}
`,
    'variables.tf': `# Input variables
variable "name" {
  description = "Your name, used in the greeting file"
  type        = string
  default     = "World"
}

variable "output_path" {
  description = "Path where the greeting file will be created"
  type        = string
  default     = "./hello.txt"
}
`,
    'outputs.tf': `# Output values
output "greeting_path" {
  description = "Path of the file created by Terraform"
  value       = local_file.greeting.filename
}

output "greeting_content" {
  description = "Content written to the file"
  value       = local_file.greeting.content
}
`
  },

  steps: [
    {
      id: 'step-1',
      title: 'Understand the file structure',
      instructions: `
A Terraform project is a directory containing .tf files. Open **main.tf** in the editor.

A Terraform configuration has three key parts:

1. **terraform {}** — declares required providers and the minimum Terraform version
2. **provider {}** — configures the provider plugin (here: the "local" provider that manages local files)
3. **resource {}** — declares a piece of infrastructure to create

The syntax is HCL (HashiCorp Configuration Language). Resources follow this pattern:

\`\`\`hcl
resource "<PROVIDER>_<TYPE>" "<LOCAL_NAME>" {
  argument = value
}
\`\`\`

**Task:** In main.tf, identify: the provider type, the resource type, and the local name of the resource.
      `,
      validate: (files) => {
        const main = files['main.tf'] || '';
        return (
          main.includes('provider "local"') &&
          main.includes('resource "local_file"')
        );
      },
      hint: 'Look for the resource block — it starts with resource "local_file" "greeting" { ... }'
    },
    {
      id: 'step-2',
      title: 'Add an input variable',
      instructions: `
Open **variables.tf**. It declares two input variables: \`name\` and \`output_path\`.

Each variable block can include:
- **description** — human-readable explanation
- **type** — string, number, bool, list, map, or object
- **default** — value used when none is provided

**Task:** Add a third variable called \`file_permissions\` with:
- description: "Unix file permissions for the created file"
- type: string  
- default: "0644"

Then update main.tf to add \`file_permission = var.file_permissions\` inside the \`local_file\` resource block.
      `,
      validate: (files) => {
        const vars = files['variables.tf'] || '';
        const main = files['main.tf'] || '';
        return (
          vars.includes('variable "file_permissions"') &&
          vars.includes('"0644"') &&
          main.includes('file_permission')
        );
      },
      hint: 'Follow the pattern of the existing variable blocks. Variable names use underscores by convention.'
    },
    {
      id: 'step-3',
      title: 'Add an output value',
      instructions: `
Open **outputs.tf**. Terraform outputs expose values after \`apply\` — useful for passing data to other modules or displaying key information.

**Task:** Add a third output called \`file_permissions\` that outputs \`local_file.greeting.file_permission\`.

Each output block needs:
- A **description**
- A **value** — referencing a resource attribute using \`<type>.<name>.<attribute>\`
      `,
      validate: (files) => {
        const outputs = files['outputs.tf'] || '';
        return (
          outputs.includes('output "file_permissions"') &&
          outputs.includes('local_file.greeting.file_permission')
        );
      },
      hint: 'Follow the pattern of the existing output blocks. Use local_file.greeting.file_permission as the value.'
    },
    {
      id: 'step-4',
      title: 'Run the Terraform workflow',
      instructions: `
The core Terraform workflow has three commands:

1. **\`terraform init\`** — downloads providers declared in the terraform {} block  
2. **\`terraform plan\`** — shows what Terraform WILL do, without making changes  
3. **\`terraform apply\`** — executes the plan and creates/updates/deletes resources

Use the simulated terminal below to run these commands. After apply, Terraform writes a **terraform.tfstate** file that tracks the current state of your resources.

**Task:** Run \`terraform init\`, then \`terraform plan\`, then \`terraform apply -auto-approve\`.
      `,
      terminal: true,
      commands: {
        'terraform init': {
          output: `Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/local versions matching "~> 2.4"...
- Installing hashicorp/local v2.4.1...
- Installed hashicorp/local v2.4.1 (signed by HashiCorp)

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure.`,
          success: true
        },
        'terraform plan': {
          output: `Terraform used the selected providers to generate the following execution plan.

  # local_file.greeting will be created
  + resource "local_file" "greeting" {
      + content              = "Hello, World! Welcome to Terraform Academy.\\n"
      + directory_permission = "0777"
      + file_permission      = "0644"
      + filename             = "./hello.txt"
      + id                   = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + file_permissions = "0644"
  + greeting_content = "Hello, World! Welcome to Terraform Academy.\\n"
  + greeting_path    = "./hello.txt"`,
          success: true
        },
        'terraform apply -auto-approve': {
          output: `local_file.greeting: Creating...
local_file.greeting: Creation complete after 0s [id=abc123def456]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

file_permissions = "0644"
greeting_content = "Hello, World! Welcome to Terraform Academy.\\n"
greeting_path    = "./hello.txt"`,
          success: true
        }
      },
      validate: (terminalHistory) => {
        const cmds = terminalHistory.map(h => h.command);
        return (
          cmds.includes('terraform init') &&
          cmds.includes('terraform plan') &&
          (cmds.includes('terraform apply -auto-approve') || cmds.includes('terraform apply'))
        );
      },
      hint: 'Run each command in order: terraform init → terraform plan → terraform apply -auto-approve'
    },
    {
      id: 'step-5',
      title: 'Inspect the state file',
      instructions: `
After \`terraform apply\`, Terraform creates **terraform.tfstate** — a JSON file that records the current state of all managed resources.

State is how Terraform knows what exists and detects drift. You should:
- **Never edit** state files manually
- **Store remote state** in S3, GCS, or Terraform Cloud for team use (not local files)
- **Never commit** terraform.tfstate to git (it can contain secrets)

Run \`terraform show\` to view the current state in a readable format.

**Task:** Run \`terraform show\` and identify the \`filename\` attribute of your resource.

**Bonus:** Run \`terraform destroy -auto-approve\` to clean up. Notice how Terraform removes the resource it created.
      `,
      terminal: true,
      commands: {
        'terraform show': {
          output: `# local_file.greeting:
resource "local_file" "greeting" {
    content              = "Hello, World! Welcome to Terraform Academy.\\n"
    directory_permission = "0777"
    file_permission      = "0644"
    filename             = "./hello.txt"
    id                   = "abc123def456"
}`,
          success: true
        },
        'terraform destroy -auto-approve': {
          output: `local_file.greeting: Destroying... [id=abc123def456]
local_file.greeting: Destruction complete after 0s

Destroy complete! Resources: 1 destroyed.`,
          success: true
        }
      },
      validate: (terminalHistory) => {
        const cmds = terminalHistory.map(h => h.command);
        return cmds.includes('terraform show');
      },
      hint: 'Run "terraform show" to inspect the state. Then try "terraform destroy -auto-approve" to remove the resource.'
    }
  ],

  summary: `
## What You Built

You wrote a complete Terraform configuration using the local provider:

- **terraform {}** block with version constraints
- **provider {}** block to configure the local provider  
- **resource {}** block to declare a local_file resource
- **variable {}** blocks for input values with types and defaults
- **output {}** blocks to expose resource attributes

## The Core Workflow

| Command | What it does |
|---------|-------------|
| terraform init | Downloads providers and sets up the backend |
| terraform plan | Shows a preview of changes (safe, no modifications made) |
| terraform apply | Executes the plan and updates real (or simulated) infrastructure |
| terraform destroy | Removes all resources managed by the configuration |
| terraform show | Displays the current state |

## Next Steps

- Try the **AWS VPC lab** to work with real provider resources
- Read about [Terraform state management](https://developer.hashicorp.com/terraform/language/state)
- Explore [Terraform modules](https://developer.hashicorp.com/terraform/language/modules) for reusable configurations

---

**Want real infrastructure?** [Terraform Academy MAX](https://terraformacademy.app) runs these labs against live AWS, GCP, and Azure environments in isolated sandboxes — no cloud account required.
  `
};

if (typeof module !== 'undefined') module.exports = TerraformHCL101Lab;
