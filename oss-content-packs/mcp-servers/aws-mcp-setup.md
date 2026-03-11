# AWS MCP Server Setup

A guide to configuring MCP servers for AWS integration in VS Code and Windsurf IDE.

## Available AWS MCP Servers

| Server | Purpose | Package |
|--------|---------|---------|
| AWS CLI | Run AWS commands | Community server |
| AWS CDK | Infrastructure as Code | Community server |
| AWS SSM | Parameter store access | Community server |
| S3 | Object storage operations | Community server |
| CloudWatch | Logs and metrics | Custom implementation |

## Prerequisites

- AWS CLI installed and configured
- AWS credentials (access key or IAM role)
- Node.js 18 or later
- VS Code or Windsurf IDE

## AWS CLI MCP Server

### VS Code Configuration

Add to VS Code settings JSON:

```json
{
  "mcp.servers": {
    "aws-cli": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

### Windsurf Configuration

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "aws-cli": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

## Using AWS Credentials

### Option 1: AWS Profile

```json
{
  "mcpServers": {
    "aws-cli": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_PROFILE": "production"
      }
    }
  }
}
```

### Option 2: Access Keys

```json
{
  "mcpServers": {
    "aws-cli": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_ACCESS_KEY_ID": "AKIA...",
        "AWS_SECRET_ACCESS_KEY": "your-secret-key",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

### Option 3: SSO

```json
{
  "mcpServers": {
    "aws-cli": {
      "command": "/bin/bash",
      "args": ["-c", "aws sso login --profile my-sso-profile && npx -y @anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_PROFILE": "my-sso-profile"
      }
    }
  }
}
```

## S3 MCP Server

For focused S3 operations:

```json
{
  "mcpServers": {
    "s3": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-s3"],
      "env": {
        "AWS_PROFILE": "default",
        "S3_BUCKET": "my-bucket-name"
      }
    }
  }
}
```

### Allowed Operations

- List buckets
- List objects
- Get object content
- Upload objects
- Delete objects

## AWS SSM Parameter Store

Access secrets and configuration:

```json
{
  "mcpServers": {
    "ssm": {
      "command": "npx",
      "args": ["-y", "mcp-server-aws-ssm"],
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "us-east-1",
        "SSM_PATH_PREFIX": "/myapp/"
      }
    }
  }
}
```

## CloudWatch Logs

Query and analyze logs:

```json
{
  "mcpServers": {
    "cloudwatch": {
      "command": "npx",
      "args": ["-y", "mcp-server-cloudwatch"],
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "us-east-1",
        "LOG_GROUP_PREFIX": "/aws/lambda/"
      }
    }
  }
}
```

## Custom AWS MCP Server

Create a custom server for specific AWS services:

### server.js

```javascript
#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');

const ec2 = new EC2Client({ region: process.env.AWS_REGION || 'us-east-1' });

const server = new Server({
  name: 'aws-ec2-server',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'list_instances',
    description: 'List EC2 instances',
    inputSchema: {
      type: 'object',
      properties: {
        state: { type: 'string', description: 'Filter by state: running, stopped, etc.' }
      }
    }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'list_instances') {
    const command = new DescribeInstancesCommand({});
    const result = await ec2.send(command);
    
    const instances = result.Reservations.flatMap(r => 
      r.Instances.map(i => ({
        id: i.InstanceId,
        type: i.InstanceType,
        state: i.State.Name,
        name: i.Tags?.find(t => t.Key === 'Name')?.Value
      }))
    );
    
    return { content: [{ type: 'text', text: JSON.stringify(instances, null, 2) }] };
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
```

### Configuration

```json
{
  "mcpServers": {
    "aws-ec2": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

## Multiple AWS Accounts

Configure servers for different accounts:

```json
{
  "mcpServers": {
    "aws-dev": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_PROFILE": "development"
      }
    },
    "aws-prod": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-aws-cli"],
      "env": {
        "AWS_PROFILE": "production"
      },
      "disabled": true
    }
  }
}
```

## Security Best Practices

1. **Use IAM roles**: Prefer roles over access keys
2. **Least privilege**: Grant minimal required permissions
3. **Use SSO**: Temporary credentials are more secure
4. **Avoid hardcoding**: Use AWS profiles or environment variables
5. **Enable CloudTrail**: Audit all API calls

### Recommended IAM Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "s3:ListBucket",
        "s3:GetObject",
        "logs:GetLogEvents",
        "logs:DescribeLogGroups",
        "ssm:GetParameter",
        "ssm:GetParameters"
      ],
      "Resource": "*"
    }
  ]
}
```

## Troubleshooting

### Credential Errors

```
Error: Could not load credentials from any providers
```

Solution:
```bash
# Verify credentials
aws sts get-caller-identity

# Refresh SSO if needed
aws sso login --profile my-profile
```

### Region Errors

```
Error: Region is missing
```

Solution: Add `AWS_REGION` to environment variables.

### Permission Denied

```
AccessDenied: User is not authorized
```

Solution: Check IAM policy has required permissions.

## Example Prompts

With AWS MCP configured, you can ask:

- "List all running EC2 instances in us-east-1"
- "Show me the contents of config.json in my S3 bucket"
- "Get the last 100 log entries from my Lambda function"
- "What SSM parameters are under /production/?"

## Next Steps

- Configure other cloud providers: [Azure MCP](./azure-mcp-setup.md), [GCP MCP](./gcp-mcp-setup.md)
- Learn AI prompting: [AI Agent Prompting Guide](../ai-tooling/ai-agent-prompting-guide.md)
- Practice with labs: [AWS VPC Lab](../labs/aws-vpc-lab.js)

## Official Resources

- AWS CLI: https://aws.amazon.com/cli/
- AWS SDK for JavaScript: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/
- MCP Specification: https://modelcontextprotocol.io

---

**Master AWS infrastructure.** Get certified at [terraformacademy.app](https://terraformacademy.app) with AWS Cloud Practitioner, Solutions Architect, and AI Practitioner exam prep.
