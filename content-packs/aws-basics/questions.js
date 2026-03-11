/**
 * AWS Cloud Basics Question Bank
 * Open Source Content Pack for Terraform Academy OSS
 * 
 * 25 questions covering AWS fundamentals
 * Suitable for beginners preparing for AWS Cloud Practitioner
 * 
 * License: MIT
 * More questions available at https://terraformacademy.com (PRO) and https://terraformacademy.app (MAX)
 */

const AWSBasicsQuestions = {
  id: 'aws-basics',
  title: 'AWS Cloud Basics',
  description: 'Foundational concepts for Amazon Web Services',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 30,
  passingScore: 70,

  questions: [
    {
      id: 'aws-001',
      question: 'What is Amazon EC2?',
      options: [
        'A database service',
        'A virtual server in the cloud',
        'A content delivery network',
        'A storage service'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Elastic Compute Cloud (EC2) provides resizable virtual servers (instances) in the AWS cloud.',
      domain: 'Compute'
    },
    {
      id: 'aws-002',
      question: 'Which service provides object storage in AWS?',
      options: [
        'Amazon EBS',
        'Amazon RDS',
        'Amazon S3',
        'Amazon EFS'
      ],
      correctAnswer: 2,
      explanation: 'Amazon Simple Storage Service (S3) provides scalable object storage for data backup, archival, and analytics.',
      domain: 'Storage'
    },
    {
      id: 'aws-003',
      question: 'What is the purpose of Amazon VPC?',
      options: [
        'Virtual private cloud networking',
        'Video processing and conversion',
        'Voice and phone connectivity',
        'Version control for code'
      ],
      correctAnswer: 0,
      explanation: 'Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS cloud.',
      domain: 'Networking'
    },
    {
      id: 'aws-004',
      question: 'Which AWS service is used for managed relational databases?',
      options: [
        'Amazon DynamoDB',
        'Amazon RDS',
        'Amazon S3',
        'Amazon ElastiCache'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Relational Database Service (RDS) makes it easy to set up, operate, and scale relational databases.',
      domain: 'Database'
    },
    {
      id: 'aws-005',
      question: 'What is an AWS Region?',
      options: [
        'A single data center',
        'A geographic area with multiple Availability Zones',
        'A network subnet',
        'A security boundary'
      ],
      correctAnswer: 1,
      explanation: 'An AWS Region is a physical location with multiple isolated Availability Zones for fault tolerance.',
      domain: 'Global Infrastructure'
    },
    {
      id: 'aws-006',
      question: 'Which service manages user access and permissions in AWS?',
      options: [
        'Amazon Cognito',
        'AWS IAM',
        'AWS Directory Service',
        'Amazon Inspector'
      ],
      correctAnswer: 1,
      explanation: 'AWS Identity and Access Management (IAM) enables you to manage access to AWS services and resources securely.',
      domain: 'Security'
    },
    {
      id: 'aws-007',
      question: 'What is an Availability Zone?',
      options: [
        'A content delivery location',
        'One or more data centers with redundant power and networking',
        'A billing boundary',
        'A service endpoint'
      ],
      correctAnswer: 1,
      explanation: 'An Availability Zone is one or more discrete data centers with redundant power, networking, and connectivity.',
      domain: 'Global Infrastructure'
    },
    {
      id: 'aws-008',
      question: 'Which service provides serverless compute for running code?',
      options: [
        'Amazon EC2',
        'AWS Lambda',
        'Amazon ECS',
        'AWS Batch'
      ],
      correctAnswer: 1,
      explanation: 'AWS Lambda lets you run code without provisioning or managing servers. You pay only for compute time consumed.',
      domain: 'Compute'
    },
    {
      id: 'aws-009',
      question: 'What is Amazon CloudFront?',
      options: [
        'A monitoring service',
        'A content delivery network',
        'A database service',
        'A messaging queue'
      ],
      correctAnswer: 1,
      explanation: 'Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data globally.',
      domain: 'Networking'
    },
    {
      id: 'aws-010',
      question: 'Which storage class is most cost effective for infrequently accessed data?',
      options: [
        'S3 Standard',
        'S3 Intelligent Tiering',
        'S3 Glacier',
        'S3 One Zone IA'
      ],
      correctAnswer: 2,
      explanation: 'S3 Glacier provides low cost storage for data archiving and long term backup with retrieval times of minutes to hours.',
      domain: 'Storage'
    },
    {
      id: 'aws-011',
      question: 'What is the AWS shared responsibility model?',
      options: [
        'Cost sharing between accounts',
        'Division of security responsibilities between AWS and customers',
        'Resource sharing across regions',
        'Workload distribution model'
      ],
      correctAnswer: 1,
      explanation: 'The shared responsibility model defines security responsibilities: AWS manages security of the cloud, customers manage security in the cloud.',
      domain: 'Security'
    },
    {
      id: 'aws-012',
      question: 'Which service provides managed Kubernetes?',
      options: [
        'Amazon ECS',
        'Amazon EKS',
        'AWS Fargate',
        'Amazon ECR'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Elastic Kubernetes Service (EKS) is a managed service for running Kubernetes on AWS.',
      domain: 'Containers'
    },
    {
      id: 'aws-013',
      question: 'What is Amazon Route 53?',
      options: [
        'A routing table service',
        'A DNS and domain registration service',
        'A VPN service',
        'A load balancer'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Route 53 is a scalable Domain Name System (DNS) web service and domain registrar.',
      domain: 'Networking'
    },
    {
      id: 'aws-014',
      question: 'Which service monitors AWS resources and applications?',
      options: [
        'AWS CloudTrail',
        'Amazon CloudWatch',
        'AWS Config',
        'Amazon Inspector'
      ],
      correctAnswer: 1,
      explanation: 'Amazon CloudWatch collects monitoring data in the form of logs, metrics, and events from AWS resources.',
      domain: 'Management'
    },
    {
      id: 'aws-015',
      question: 'What is the purpose of an IAM role?',
      options: [
        'Store user passwords',
        'Grant temporary permissions to AWS services or users',
        'Define network access rules',
        'Encrypt data at rest'
      ],
      correctAnswer: 1,
      explanation: 'IAM roles provide temporary security credentials for entities to access AWS resources without long term credentials.',
      domain: 'Security'
    },
    {
      id: 'aws-016',
      question: 'Which service provides block storage for EC2?',
      options: [
        'Amazon S3',
        'Amazon EBS',
        'Amazon EFS',
        'AWS Storage Gateway'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Elastic Block Store (EBS) provides persistent block storage volumes for EC2 instances.',
      domain: 'Storage'
    },
    {
      id: 'aws-017',
      question: 'What is an AWS Security Group?',
      options: [
        'A team of AWS security engineers',
        'A virtual firewall for EC2 instances',
        'An IAM policy type',
        'A compliance framework'
      ],
      correctAnswer: 1,
      explanation: 'A security group acts as a virtual firewall controlling inbound and outbound traffic to EC2 instances.',
      domain: 'Security'
    },
    {
      id: 'aws-018',
      question: 'Which pricing model offers the largest discount for steady workloads?',
      options: [
        'On Demand',
        'Spot Instances',
        'Reserved Instances',
        'Savings Plans'
      ],
      correctAnswer: 2,
      explanation: 'Reserved Instances offer significant discounts (up to 72%) compared to On Demand pricing for committed usage.',
      domain: 'Pricing'
    },
    {
      id: 'aws-019',
      question: 'What is Amazon DynamoDB?',
      options: [
        'A relational database',
        'A fully managed NoSQL database',
        'A data warehouse',
        'A caching service'
      ],
      correctAnswer: 1,
      explanation: 'Amazon DynamoDB is a fully managed NoSQL database service providing fast and predictable performance.',
      domain: 'Database'
    },
    {
      id: 'aws-020',
      question: 'Which service distributes incoming traffic across multiple targets?',
      options: [
        'Amazon Route 53',
        'Elastic Load Balancing',
        'AWS Direct Connect',
        'Amazon API Gateway'
      ],
      correctAnswer: 1,
      explanation: 'Elastic Load Balancing automatically distributes incoming application traffic across multiple targets.',
      domain: 'Networking'
    },
    {
      id: 'aws-021',
      question: 'What is AWS CloudFormation?',
      options: [
        'A monitoring service',
        'An Infrastructure as Code service',
        'A security scanning tool',
        'A cost management tool'
      ],
      correctAnswer: 1,
      explanation: 'AWS CloudFormation lets you model and provision AWS resources using templates.',
      domain: 'Management'
    },
    {
      id: 'aws-022',
      question: 'Which service records API calls for auditing?',
      options: [
        'Amazon CloudWatch',
        'AWS CloudTrail',
        'AWS Config',
        'Amazon GuardDuty'
      ],
      correctAnswer: 1,
      explanation: 'AWS CloudTrail records API calls made on your account, providing event history for auditing and compliance.',
      domain: 'Security'
    },
    {
      id: 'aws-023',
      question: 'What is the AWS Free Tier?',
      options: [
        'A billing discount program',
        'Free usage of certain services within limits',
        'A support plan level',
        'An open source initiative'
      ],
      correctAnswer: 1,
      explanation: 'The AWS Free Tier offers free usage of many AWS services within specified limits for new and existing customers.',
      domain: 'Pricing'
    },
    {
      id: 'aws-024',
      question: 'Which service enables hybrid cloud connectivity?',
      options: [
        'Amazon VPC',
        'AWS Direct Connect',
        'Amazon CloudFront',
        'AWS Transit Gateway'
      ],
      correctAnswer: 1,
      explanation: 'AWS Direct Connect establishes a dedicated network connection from your premises to AWS.',
      domain: 'Networking'
    },
    {
      id: 'aws-025',
      question: 'What is Amazon SNS used for?',
      options: [
        'Streaming data',
        'Pub/sub messaging and notifications',
        'Email hosting',
        'File transfer'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Simple Notification Service (SNS) is a fully managed pub/sub messaging service for application integration.',
      domain: 'Application Integration'
    }
  ],

  domains: [
    { name: 'Compute', count: 2 },
    { name: 'Storage', count: 3 },
    { name: 'Networking', count: 5 },
    { name: 'Database', count: 2 },
    { name: 'Security', count: 5 },
    { name: 'Global Infrastructure', count: 2 },
    { name: 'Management', count: 2 },
    { name: 'Containers', count: 1 },
    { name: 'Pricing', count: 2 },
    { name: 'Application Integration', count: 1 }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AWSBasicsQuestions;
}
