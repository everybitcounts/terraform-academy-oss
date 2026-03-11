/**
 * AWS VPC Lab Configuration
 * Open Source Lab for Terraform Academy OSS
 * 
 * Teaches basic VPC setup with Terraform
 * 
 * License: MIT
 */

const AWSVPCLab = {
  id: 'aws-vpc-basics',
  title: 'AWS VPC with Terraform',
  description: 'Create a Virtual Private Cloud with public and private subnets',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 20,
  provider: 'aws',

  objectives: [
    'Create a VPC with a specified CIDR block',
    'Configure a public subnet with internet access',
    'Configure a private subnet for internal resources',
    'Set up an Internet Gateway for external connectivity',
    'Apply proper resource tagging'
  ],

  prerequisites: [
    'Basic understanding of networking concepts',
    'Familiarity with Terraform syntax',
    'AWS account (for deployment testing)'
  ],

  files: {
    'main.tf': {
      starter: `# AWS VPC Lab
# Your task: Create a VPC with public and private subnets

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# TODO: Create a VPC resource
# Name: main
# CIDR: 10.0.0.0/16
# Enable DNS hostnames

# TODO: Create a public subnet
# CIDR: 10.0.1.0/24
# Availability Zone: use data source

# TODO: Create a private subnet
# CIDR: 10.0.2.0/24
# Availability Zone: same as public

# TODO: Create an Internet Gateway
# Attach to the VPC

# TODO: Create a route table for public subnet
# Add route to Internet Gateway
`,
      solution: `# AWS VPC Lab - Solution

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "terraform-academy-vpc"
    Environment = "lab"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet"
    Type = "public"
  }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "private-subnet"
    Type = "private"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public-route-table"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}
`
    },
    'variables.tf': {
      starter: `# Variables for AWS VPC Lab

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

# TODO: Add any additional variables you need
`,
      solution: `# Variables for AWS VPC Lab

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name for tagging"
  type        = string
  default     = "lab"
}
`
    },
    'outputs.tf': {
      starter: `# Outputs for AWS VPC Lab

# TODO: Output the VPC ID

# TODO: Output the public subnet ID

# TODO: Output the private subnet ID
`,
      solution: `# Outputs for AWS VPC Lab

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "ID of the private subnet"
  value       = aws_subnet.private.id
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}
`
    }
  },

  validation: {
    rules: [
      {
        type: 'resource_exists',
        resource: 'aws_vpc.main',
        message: 'VPC resource must be defined'
      },
      {
        type: 'attribute_value',
        resource: 'aws_vpc.main',
        attribute: 'cidr_block',
        expected: '10.0.0.0/16',
        message: 'VPC CIDR must be 10.0.0.0/16'
      },
      {
        type: 'resource_exists',
        resource: 'aws_subnet.public',
        message: 'Public subnet must be defined'
      },
      {
        type: 'resource_exists',
        resource: 'aws_subnet.private',
        message: 'Private subnet must be defined'
      },
      {
        type: 'resource_exists',
        resource: 'aws_internet_gateway.main',
        message: 'Internet Gateway must be defined'
      },
      {
        type: 'resource_exists',
        resource: 'aws_route_table.public',
        message: 'Public route table must be defined'
      }
    ]
  },

  hints: [
    {
      trigger: 'missing_vpc',
      message: 'Start by creating an aws_vpc resource with the cidr_block argument'
    },
    {
      trigger: 'missing_igw',
      message: 'An Internet Gateway is needed for public subnet internet access. Use aws_internet_gateway resource.'
    },
    {
      trigger: 'missing_route',
      message: 'Create an aws_route_table with a route to 0.0.0.0/0 via the Internet Gateway'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AWSVPCLab;
}
