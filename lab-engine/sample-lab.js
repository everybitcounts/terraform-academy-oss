/**
 * Sample Lab Definition — Lab Engine Demo
 *
 * Replace this with your own lab configuration.
 * See lab-engine/README.md for the full config schema.
 */

const SAMPLE_LAB = {
  title: 'VPC + Subnet Lab',
  estimatedMinutes: 20,         // Displayed on the lab start screen. Required for community contributions.
  difficulty: 'beginner',       // 'beginner' | 'intermediate' | 'advanced'
  examDomain: 'Terraform Associate 004 — Infrastructure as Code Concepts',
  instructionTitle: 'Create a VPC with Subnets and Internet Access',
  instructionHTML: `
    <p>In the <strong>Code Editor</strong>, open the <code>network.tf</code> file.</p>
    <p>Your task:</p>
    <ul style="padding-left:20px;margin:10px 0;">
      <li>Create a VPC with CIDR <code>10.0.0.0/16</code></li>
      <li>Add a public subnet: <code>10.0.1.0/24</code></li>
      <li>Add a private subnet: <code>10.0.2.0/24</code></li>
      <li>Create an Internet Gateway</li>
      <li>Create a route table with a route to the Internet Gateway</li>
      <li>Associate the route table with the public subnet</li>
    </ul>
  `,

  // File tree structure
  fileTree: [
    {
      name: '/root/learn-terraform-vpc',
      children: ['provider.tf', 'network.tf']
    }
  ],

  // Initial file contents
  files: {
    'provider.tf': 'provider "aws" {\n  region = "us-east-1"\n}',
    'network.tf': '# Define your VPC, subnets, Internet Gateway, route table, and associations here\n'
  },

  // Which file to open by default
  defaultFile: 'provider.tf',

  // Which file must be edited for validation
  requiredFile: 'network.tf',

  // Validation rules — each must be present in the code
  validationRules: [
    { contains: 'aws_vpc', message: 'Missing aws_vpc resource' },
    { contains: '10.0.0.0/16', message: 'VPC CIDR should be 10.0.0.0/16' },
    { contains: 'aws_subnet', message: 'Missing aws_subnet resource(s)' },
    { contains: '10.0.1.0/24', message: 'Public subnet CIDR should be 10.0.1.0/24' },
    { contains: '10.0.2.0/24', message: 'Private subnet CIDR should be 10.0.2.0/24' },
    { contains: 'aws_internet_gateway', message: 'Missing aws_internet_gateway resource' },
    { contains: 'aws_route_table', message: 'Missing aws_route_table resource' },
    { contains: '0.0.0.0/0', message: 'Route table needs a route to 0.0.0.0/0' },
    { contains: 'aws_route_table_association', message: 'Missing aws_route_table_association resource' }
  ],

  // Success message shown in terminal
  successMessage: 'Success! Your Terraform code is correct.\nApplying configuration...\nVPC and networking resources created successfully.',

  // Solution code (shown via "Show Answer" button)
  solution: `resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}`
};
