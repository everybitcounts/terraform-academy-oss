# AI Agent Prompting Guide

A practical guide to writing effective prompts for AI coding assistants and agents in infrastructure and cloud development workflows.

## Understanding AI Agents

AI agents are autonomous systems that can plan, execute, and iterate on tasks. Unlike simple chatbots, they can:

- Break down complex tasks into steps
- Use tools (file access, terminal commands, API calls)
- Learn from feedback and adjust their approach
- Maintain context across multiple interactions

## Prompting Fundamentals

### Be Specific

**Poor prompt:**
```
Make a Terraform file
```

**Better prompt:**
```
Create a Terraform configuration that provisions an AWS VPC with:
- CIDR block 10.0.0.0/16
- Two public subnets in different availability zones
- An Internet Gateway attached to the VPC
- Route table for public subnet internet access
- Use the AWS provider version 5.0 or later
```

### Provide Context

**Poor prompt:**
```
Fix the error
```

**Better prompt:**
```
I'm getting this error when running terraform plan:

Error: Reference to undeclared resource

The file main.tf references aws_subnet.private but I only see aws_subnet.public defined. Review the configuration and add the missing private subnet resource.
```

### Specify Output Format

**Poor prompt:**
```
Explain VPC networking
```

**Better prompt:**
```
Explain AWS VPC networking concepts in a table format with columns for:
- Component name
- Purpose
- Key configuration options
- Example use case

Focus on VPC, subnets, route tables, and gateways.
```

## Task Oriented Prompts

### Code Generation

```
Create a Terraform module for an AWS S3 bucket with the following features:

Inputs:
- bucket_name (required)
- environment (optional, default: "dev")
- enable_versioning (optional, default: true)

The bucket should have:
- Server side encryption with AES256
- Block all public access
- Lifecycle rule to move objects to Glacier after 90 days
- Tags for Name and Environment

Output the bucket ARN and domain name.
```

### Code Review

```
Review this Terraform configuration for security best practices:

[paste code]

Check for:
1. Hardcoded secrets or credentials
2. Overly permissive IAM policies
3. Missing encryption settings
4. Public access where it should be private
5. Missing tags for resource tracking

Provide specific line numbers and recommended fixes.
```

### Debugging

```
Debug this Terraform error:

Error: Error creating S3 bucket: BucketAlreadyExists

Context:
- Running terraform apply in CI/CD pipeline
- Using workspace: production
- The bucket did exist but was destroyed in previous run

Explain why this happens and provide 3 possible solutions.
```

### Refactoring

```
Refactor this Terraform configuration to use modules:

[paste code]

Requirements:
- Create a reusable VPC module
- Create a reusable EC2 module
- Main config should call both modules
- Variables should be passed through terraform.tfvars
- Follow Terraform style conventions
```

## Infrastructure Specific Prompts

### AWS

```
Create Terraform code for a highly available web application on AWS:

Architecture:
- Application Load Balancer in public subnets
- Auto Scaling Group with 2-4 EC2 instances
- RDS PostgreSQL in private subnets with Multi-AZ
- Security groups restricting traffic appropriately

Use AWS provider 5.x and follow AWS Well-Architected Framework principles.
```

### Azure

```
Generate Terraform for an Azure Kubernetes Service cluster:

Requirements:
- AKS cluster version 1.28
- System node pool with 3 nodes (Standard_D2s_v3)
- User node pool with autoscaling 1-5 nodes
- Azure CNI networking
- Azure Active Directory integration
- Container Insights enabled

Use azurerm provider 3.x.
```

### GCP

```
Write Terraform for a GCP Cloud Run service:

Specifications:
- Container from Artifact Registry
- Minimum 0 instances, maximum 10
- 1 vCPU, 512MB memory per instance
- Allow unauthenticated access
- Custom domain mapping
- Cloud SQL connection

Use google provider 5.x.
```

## Multi Step Task Prompts

### Investigation

```
I need to migrate our infrastructure from AWS to Azure. Analyze the current Terraform configuration in this repository and:

1. List all AWS resources currently provisioned
2. Identify Azure equivalents for each resource
3. Note any services without direct equivalents
4. Estimate complexity (low/medium/high) for each migration
5. Suggest an order of operations for the migration

Present findings in a markdown table.
```

### Implementation Plan

```
Create an implementation plan for adding observability to our Terraform managed infrastructure:

Current state:
- AWS EKS cluster
- RDS PostgreSQL
- ElastiCache Redis
- S3 buckets

Required:
- CloudWatch metrics and alarms
- CloudWatch Logs integration
- X-Ray tracing for applications
- Cost monitoring with AWS Budgets

Provide Terraform code for each component with clear comments.
```

## Role Based Prompts

### As a Senior Engineer

```
Acting as a senior DevOps engineer, review this Terraform codebase for:
- Modularity and reusability
- Security posture
- Cost optimization opportunities
- Operational readiness
- Documentation gaps

Provide actionable recommendations prioritized by impact.
```

### As a Teacher

```
Explain Terraform state management as if teaching a junior developer. Cover:
- What state is and why it matters
- Local vs remote state
- State locking
- Common state operations (import, mv, rm)

Use simple analogies and provide hands on examples they can try.
```

## Iterative Refinement

### Initial Request

```
Create a basic AWS Lambda function with Terraform.
```

### Refinement 1

```
Good start. Now add:
- API Gateway trigger
- CloudWatch Logs
- IAM role with least privilege
```

### Refinement 2

```
Update the Lambda to:
- Use Python 3.11 runtime
- Include a requirements layer
- Add environment variables for configuration
- Set reserved concurrency to 10
```

## Common Patterns

### Explain Then Implement

```
First explain the best practices for [topic], then implement a Terraform solution following those practices.
```

### Compare Options

```
Compare three approaches for [task]:
1. [Approach A]
2. [Approach B]
3. [Approach C]

Include pros, cons, and use cases for each. Then implement the recommended approach.
```

### Validate and Fix

```
Review this configuration for errors:

[code]

For each issue found:
1. Explain the problem
2. Show the incorrect code
3. Provide the corrected code
4. Explain why the fix works
```

## Anti Patterns to Avoid

### Too Vague

```
Make it better
```

### No Context

```
Why doesn't this work?
```

### Multiple Unrelated Tasks

```
Create a VPC, also explain Kubernetes, and write a Python script
```

### Assuming Knowledge

```
Do the usual setup
```

## Tools Integration Prompts

### With MCP Servers

```
Using the filesystem server, analyze all .tf files in the current directory and:
1. List all providers used
2. Count resources by type
3. Identify any deprecated syntax
4. Generate a summary report
```

### With GitHub

```
Using the GitHub server, review the last 5 pull requests in this repository for:
- Terraform changes
- Security implications
- Missing documentation
- Suggest improvements for each
```

## Next Steps

- Configure MCP servers: [VS Code Setup](./mcp-server-vscode-setup.md), [Windsurf Setup](./mcp-server-windsurf-setup.md)
- Practice with labs: [Terraform Labs](../labs/)
- Get certified: [Terraform Academy AI Certifications](https://terraformacademy.app/max/certifications/)

## Official Resources

- Anthropic Prompt Engineering: https://docs.anthropic.com/claude/docs/prompt-engineering
- OpenAI Best Practices: https://platform.openai.com/docs/guides/prompt-engineering
- Google AI Prompting: https://ai.google.dev/docs/prompt_best_practices

---

**Master AI for infrastructure automation.** Visit [terraformacademy.app](https://terraformacademy.app) for AI certification prep including AWS AI Practitioner (AIF-C01), Azure AI Fundamentals (AI-900), and GCP Generative AI certifications.
