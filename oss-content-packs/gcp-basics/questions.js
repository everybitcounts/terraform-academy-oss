/**
 * Google Cloud Basics Question Bank
 * Open Source Content Pack for Terraform Academy OSS
 * 
 * 25 questions covering Google Cloud Platform fundamentals
 * Suitable for beginners preparing for Cloud Digital Leader
 * 
 * License: Apache-2.0
 * More questions available at https://terraformacademy.com (PRO) and https://terraformacademy.app (MAX)
 */

const GCPBasicsQuestions = {
  id: 'gcp-basics',
  title: 'Google Cloud Basics',
  description: 'Foundational concepts for Google Cloud Platform',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 30,
  passingScore: 70,

  questions: [
    {
      id: 'gcp-001',
      question: 'What is a Google Cloud Region?',
      options: [
        'A single data center',
        'A specific geographic location with one or more zones',
        'A billing account',
        'A project container'
      ],
      correctAnswer: 1,
      explanation: 'A Google Cloud Region is a specific geographic location where you can host your resources, containing one or more zones.',
      domain: 'Core Infrastructure'
    },
    {
      id: 'gcp-002',
      question: 'Which service provides virtual machines in Google Cloud?',
      options: [
        'Cloud Functions',
        'Compute Engine',
        'App Engine',
        'Cloud Run'
      ],
      correctAnswer: 1,
      explanation: 'Compute Engine provides scalable, high performance virtual machines running in Google data centers.',
      domain: 'Compute'
    },
    {
      id: 'gcp-003',
      question: 'What is Cloud Storage used for?',
      options: [
        'Running virtual machines',
        'Object and blob storage',
        'Relational databases',
        'Container orchestration'
      ],
      correctAnswer: 1,
      explanation: 'Cloud Storage is a unified object storage service for developers and enterprises, offering high durability and availability.',
      domain: 'Storage'
    },
    {
      id: 'gcp-004',
      question: 'What is a Google Cloud Zone?',
      options: [
        'A pricing tier',
        'An isolated deployment area within a region',
        'A network boundary',
        'A project type'
      ],
      correctAnswer: 1,
      explanation: 'A zone is an isolated deployment area within a region. Resources in different zones are isolated from each other for fault tolerance.',
      domain: 'Core Infrastructure'
    },
    {
      id: 'gcp-005',
      question: 'Which service manages identity and access in Google Cloud?',
      options: [
        'Cloud Identity',
        'IAM (Identity and Access Management)',
        'Secret Manager',
        'Cloud Armor'
      ],
      correctAnswer: 1,
      explanation: 'IAM lets you manage access control by defining who has what access to which resources.',
      domain: 'Security'
    },
    {
      id: 'gcp-006',
      question: 'What is a Google Cloud Project?',
      options: [
        'A billing category only',
        'An organizational unit for grouping and managing resources',
        'A type of virtual machine',
        'A network configuration'
      ],
      correctAnswer: 1,
      explanation: 'A project organizes all your Google Cloud resources, including billing, APIs, and team access.',
      domain: 'Management'
    },
    {
      id: 'gcp-007',
      question: 'Which service provides managed SQL databases in Google Cloud?',
      options: [
        'Cloud Bigtable',
        'Cloud SQL',
        'Cloud Spanner',
        'Firestore'
      ],
      correctAnswer: 1,
      explanation: 'Cloud SQL is a fully managed relational database service for MySQL, PostgreSQL, and SQL Server.',
      domain: 'Database'
    },
    {
      id: 'gcp-008',
      question: 'What is VPC (Virtual Private Cloud) in Google Cloud?',
      options: [
        'A content delivery network',
        'A global virtual network for your resources',
        'A storage service',
        'A machine learning platform'
      ],
      correctAnswer: 1,
      explanation: 'VPC provides networking functionality to Compute Engine virtual machine instances, GKE clusters, and other resources.',
      domain: 'Networking'
    },
    {
      id: 'gcp-009',
      question: 'Which service runs code without managing servers in Google Cloud?',
      options: [
        'Compute Engine',
        'Cloud Functions',
        'GKE',
        'Cloud Composer'
      ],
      correctAnswer: 1,
      explanation: 'Cloud Functions is a serverless execution environment for building and connecting cloud services.',
      domain: 'Compute'
    },
    {
      id: 'gcp-010',
      question: 'What is App Engine?',
      options: [
        'A mobile app store',
        'A fully managed platform for building applications',
        'A desktop application service',
        'A developer IDE'
      ],
      correctAnswer: 1,
      explanation: 'App Engine is a fully managed, serverless platform for developing and hosting web applications at scale.',
      domain: 'Compute'
    },
    {
      id: 'gcp-011',
      question: 'Which storage class is most cost effective for rarely accessed data?',
      options: [
        'Standard',
        'Nearline',
        'Coldline',
        'Archive'
      ],
      correctAnswer: 3,
      explanation: 'Archive storage is the lowest cost option for data that you plan to access less than once a year.',
      domain: 'Storage'
    },
    {
      id: 'gcp-012',
      question: 'What is Cloud Load Balancing used for?',
      options: [
        'Storing static content',
        'Distributing traffic across instances globally',
        'Managing DNS records',
        'Encrypting data'
      ],
      correctAnswer: 1,
      explanation: 'Cloud Load Balancing distributes user traffic across multiple instances of your applications.',
      domain: 'Networking'
    },
    {
      id: 'gcp-013',
      question: 'Which service provides managed Kubernetes in Google Cloud?',
      options: [
        'Cloud Run',
        'GKE (Google Kubernetes Engine)',
        'Container Registry',
        'Cloud Build'
      ],
      correctAnswer: 1,
      explanation: 'GKE is a managed environment for deploying, managing, and scaling containerized applications using Kubernetes.',
      domain: 'Containers'
    },
    {
      id: 'gcp-014',
      question: 'What is Cloud Spanner?',
      options: [
        'A NoSQL database only',
        'A globally distributed relational database',
        'A caching service',
        'A message queue'
      ],
      correctAnswer: 1,
      explanation: 'Cloud Spanner is a fully managed, mission critical, relational database service with global scale and consistency.',
      domain: 'Database'
    },
    {
      id: 'gcp-015',
      question: 'Which tool provisions Google Cloud resources using configuration files?',
      options: [
        'gcloud CLI',
        'Deployment Manager or Terraform',
        'Cloud Console',
        'Cloud Shell'
      ],
      correctAnswer: 1,
      explanation: 'Deployment Manager and Terraform allow you to create and manage cloud resources using declarative configuration files.',
      domain: 'Management'
    },
    {
      id: 'gcp-016',
      question: 'What is Secret Manager used for?',
      options: [
        'Managing VM images',
        'Storing and managing sensitive data like API keys',
        'Running databases',
        'Container orchestration'
      ],
      correctAnswer: 1,
      explanation: 'Secret Manager stores, manages, and accesses secrets as binary blobs or text strings securely.',
      domain: 'Security'
    },
    {
      id: 'gcp-017',
      question: 'What is a Firewall Rule in Google Cloud?',
      options: [
        'A physical firewall device',
        'A rule that controls traffic to and from VM instances',
        'A DNS configuration',
        'A load balancer setting'
      ],
      correctAnswer: 1,
      explanation: 'VPC firewall rules let you allow or deny traffic to and from your virtual machine instances based on configuration.',
      domain: 'Networking'
    },
    {
      id: 'gcp-018',
      question: 'Which service collects and analyzes logs and metrics?',
      options: [
        'Cloud Logging and Cloud Monitoring',
        'Cloud Debugger',
        'Cloud Trace',
        'Error Reporting'
      ],
      correctAnswer: 0,
      explanation: 'Cloud Logging stores logs and Cloud Monitoring collects measurements from your cloud resources.',
      domain: 'Operations'
    },
    {
      id: 'gcp-019',
      question: 'What is Cloud Interconnect?',
      options: [
        'A content delivery network',
        'A dedicated connection between on premises and Google Cloud',
        'A web application firewall',
        'A container registry'
      ],
      correctAnswer: 1,
      explanation: 'Cloud Interconnect extends your on premises network to Google Cloud through a highly available, low latency connection.',
      domain: 'Networking'
    },
    {
      id: 'gcp-020',
      question: 'Which pricing model offers the largest discount for sustained usage?',
      options: [
        'On demand',
        'Committed use discounts',
        'Preemptible VMs',
        'Free tier'
      ],
      correctAnswer: 1,
      explanation: 'Committed use discounts offer significant savings (up to 70%) in exchange for committing to use resources for one or three years.',
      domain: 'Pricing'
    },
    {
      id: 'gcp-021',
      question: 'What is Organization Policy?',
      options: [
        'A legal document',
        'Centralized constraints for managing resources',
        'A network routing rule',
        'An authentication method'
      ],
      correctAnswer: 1,
      explanation: 'Organization Policy allows you to set constraints across your entire resource hierarchy to enforce rules.',
      domain: 'Governance'
    },
    {
      id: 'gcp-022',
      question: 'Which service provides a global content delivery network?',
      options: [
        'Cloud DNS',
        'Cloud CDN',
        'Cloud Armor',
        'Traffic Director'
      ],
      correctAnswer: 1,
      explanation: 'Cloud CDN (Content Delivery Network) uses Google edge locations to cache content close to users.',
      domain: 'Networking'
    },
    {
      id: 'gcp-023',
      question: 'What is the Google Cloud Shared Responsibility Model?',
      options: [
        'Cost sharing between projects',
        'Division of security duties between Google and customers',
        'Resource sharing between zones',
        'Load distribution model'
      ],
      correctAnswer: 1,
      explanation: 'The shared responsibility model defines which security tasks are handled by Google Cloud and which by the customer.',
      domain: 'Security'
    },
    {
      id: 'gcp-024',
      question: 'What is BigQuery?',
      options: [
        'A NoSQL document database',
        'A fully managed data warehouse for analytics',
        'A message queue service',
        'A caching solution'
      ],
      correctAnswer: 1,
      explanation: 'BigQuery is a fully managed, serverless data warehouse that enables super fast SQL queries.',
      domain: 'Analytics'
    },
    {
      id: 'gcp-025',
      question: 'Which service provides recommendations for optimizing resources?',
      options: [
        'Cloud Monitoring',
        'Recommender',
        'Cloud Advisor',
        'Cost Management'
      ],
      correctAnswer: 1,
      explanation: 'Recommender provides usage recommendations for Google Cloud products and services to optimize cost and security.',
      domain: 'Management'
    }
  ],

  domains: [
    { name: 'Core Infrastructure', count: 2 },
    { name: 'Compute', count: 3 },
    { name: 'Storage', count: 2 },
    { name: 'Networking', count: 5 },
    { name: 'Database', count: 2 },
    { name: 'Security', count: 3 },
    { name: 'Management', count: 3 },
    { name: 'Containers', count: 1 },
    { name: 'Pricing', count: 1 },
    { name: 'Governance', count: 1 },
    { name: 'Operations', count: 1 },
    { name: 'Analytics', count: 1 }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GCPBasicsQuestions;
}
