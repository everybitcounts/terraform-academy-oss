/**
 * Azure Cloud Basics Question Bank
 * Open Source Content Pack for Terraform Academy OSS
 * 
 * 25 questions covering Azure fundamentals
 * Suitable for beginners preparing for Azure Fundamentals AZ-900
 * 
 * License: MIT
 * More questions available at https://terraformacademy.com (PRO) and https://terraformacademy.app (MAX)
 */

const AzureBasicsQuestions = {
  id: 'azure-basics',
  title: 'Azure Cloud Basics',
  description: 'Foundational concepts for Microsoft Azure',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 30,
  passingScore: 70,

  questions: [
    {
      id: 'az-001',
      question: 'What is an Azure Region?',
      options: [
        'A single data center',
        'A geographical area containing one or more data centers',
        'A virtual network boundary',
        'A billing account'
      ],
      correctAnswer: 1,
      explanation: 'An Azure Region is a geographical area containing one or more data centers that are connected with low latency networking.',
      domain: 'Core Architecture'
    },
    {
      id: 'az-002',
      question: 'Which Azure service provides virtual machines?',
      options: [
        'Azure Functions',
        'Azure Virtual Machines',
        'Azure App Service',
        'Azure Container Instances'
      ],
      correctAnswer: 1,
      explanation: 'Azure Virtual Machines provides on demand, scalable computing resources in the cloud.',
      domain: 'Compute'
    },
    {
      id: 'az-003',
      question: 'What is Azure Blob Storage used for?',
      options: [
        'Relational database storage',
        'Unstructured data and object storage',
        'File shares for Windows servers',
        'Message queue storage'
      ],
      correctAnswer: 1,
      explanation: 'Azure Blob Storage is optimized for storing massive amounts of unstructured data such as text and binary data.',
      domain: 'Storage'
    },
    {
      id: 'az-004',
      question: 'What is an Azure Availability Zone?',
      options: [
        'A pricing tier',
        'A physically separate location within a region',
        'A network security boundary',
        'A resource group category'
      ],
      correctAnswer: 1,
      explanation: 'Availability Zones are physically separate locations within an Azure region with independent power, cooling, and networking.',
      domain: 'Core Architecture'
    },
    {
      id: 'az-005',
      question: 'Which service manages identity and access in Azure?',
      options: [
        'Azure Active Directory',
        'Azure Key Vault',
        'Azure Security Center',
        'Azure Monitor'
      ],
      correctAnswer: 0,
      explanation: 'Azure Active Directory (now Microsoft Entra ID) is a cloud identity and access management service.',
      domain: 'Identity'
    },
    {
      id: 'az-006',
      question: 'What is an Azure Resource Group?',
      options: [
        'A billing category',
        'A logical container for managing related Azure resources',
        'A type of virtual machine',
        'A network security feature'
      ],
      correctAnswer: 1,
      explanation: 'A Resource Group is a logical container that holds related resources for an Azure solution.',
      domain: 'Management'
    },
    {
      id: 'az-007',
      question: 'Which Azure service provides managed SQL databases?',
      options: [
        'Azure Cosmos DB',
        'Azure SQL Database',
        'Azure Table Storage',
        'Azure Cache for Redis'
      ],
      correctAnswer: 1,
      explanation: 'Azure SQL Database is a fully managed relational database service based on the SQL Server engine.',
      domain: 'Database'
    },
    {
      id: 'az-008',
      question: 'What is Azure Virtual Network (VNet)?',
      options: [
        'A content delivery network',
        'An isolated network in the Azure cloud',
        'A VPN service only',
        'A load balancer'
      ],
      correctAnswer: 1,
      explanation: 'Azure Virtual Network enables Azure resources to securely communicate with each other, the internet, and on premises networks.',
      domain: 'Networking'
    },
    {
      id: 'az-009',
      question: 'Which service runs code without managing servers in Azure?',
      options: [
        'Azure Virtual Machines',
        'Azure Functions',
        'Azure Kubernetes Service',
        'Azure Batch'
      ],
      correctAnswer: 1,
      explanation: 'Azure Functions is a serverless compute service that runs code on demand without provisioning infrastructure.',
      domain: 'Compute'
    },
    {
      id: 'az-010',
      question: 'What is Azure App Service?',
      options: [
        'A mobile app store',
        'A platform for hosting web applications and APIs',
        'A desktop application service',
        'An app development IDE'
      ],
      correctAnswer: 1,
      explanation: 'Azure App Service is a fully managed platform for building, deploying, and scaling web apps.',
      domain: 'Compute'
    },
    {
      id: 'az-011',
      question: 'Which storage tier is most cost effective for rarely accessed data?',
      options: [
        'Hot',
        'Cool',
        'Archive',
        'Premium'
      ],
      correctAnswer: 2,
      explanation: 'The Archive tier offers the lowest storage costs for data that can tolerate several hours of retrieval latency.',
      domain: 'Storage'
    },
    {
      id: 'az-012',
      question: 'What is Azure Load Balancer used for?',
      options: [
        'Storing static content',
        'Distributing traffic across multiple resources',
        'Managing DNS records',
        'Encrypting data'
      ],
      correctAnswer: 1,
      explanation: 'Azure Load Balancer distributes incoming traffic among healthy virtual machines or services.',
      domain: 'Networking'
    },
    {
      id: 'az-013',
      question: 'Which service provides managed Kubernetes in Azure?',
      options: [
        'Azure Container Instances',
        'Azure Kubernetes Service',
        'Azure Container Registry',
        'Azure Service Fabric'
      ],
      correctAnswer: 1,
      explanation: 'Azure Kubernetes Service (AKS) simplifies deploying and managing containerized applications using Kubernetes.',
      domain: 'Containers'
    },
    {
      id: 'az-014',
      question: 'What is Azure Cosmos DB?',
      options: [
        'A relational database only',
        'A globally distributed multi model database',
        'A file storage service',
        'A caching solution'
      ],
      correctAnswer: 1,
      explanation: 'Azure Cosmos DB is a globally distributed, multi model database service for mission critical applications.',
      domain: 'Database'
    },
    {
      id: 'az-015',
      question: 'Which tool provisions Azure resources using templates?',
      options: [
        'Azure CLI',
        'ARM Templates',
        'Azure PowerShell',
        'Azure Portal'
      ],
      correctAnswer: 1,
      explanation: 'Azure Resource Manager (ARM) Templates define infrastructure as code using JSON to deploy and manage resources.',
      domain: 'Management'
    },
    {
      id: 'az-016',
      question: 'What is Azure Key Vault used for?',
      options: [
        'Storing virtual machine images',
        'Managing secrets, keys, and certificates',
        'Hosting databases',
        'Running containers'
      ],
      correctAnswer: 1,
      explanation: 'Azure Key Vault safeguards cryptographic keys, secrets, and certificates used by cloud applications.',
      domain: 'Security'
    },
    {
      id: 'az-017',
      question: 'What is a Network Security Group (NSG)?',
      options: [
        'A team of network administrators',
        'A firewall that filters network traffic',
        'A VPN endpoint',
        'A DNS server'
      ],
      correctAnswer: 1,
      explanation: 'A Network Security Group contains security rules that allow or deny inbound and outbound network traffic.',
      domain: 'Networking'
    },
    {
      id: 'az-018',
      question: 'Which Azure service collects and analyzes telemetry data?',
      options: [
        'Azure Advisor',
        'Azure Monitor',
        'Azure Policy',
        'Azure Blueprints'
      ],
      correctAnswer: 1,
      explanation: 'Azure Monitor collects and analyzes telemetry data from Azure and on premises environments.',
      domain: 'Management'
    },
    {
      id: 'az-019',
      question: 'What is Azure ExpressRoute?',
      options: [
        'A content delivery network',
        'A dedicated private connection to Azure',
        'A web application firewall',
        'A load balancing service'
      ],
      correctAnswer: 1,
      explanation: 'Azure ExpressRoute creates private connections from on premises infrastructure to Azure data centers.',
      domain: 'Networking'
    },
    {
      id: 'az-020',
      question: 'Which pricing model offers the largest discount for committed usage?',
      options: [
        'Pay as you go',
        'Reserved Instances',
        'Spot Instances',
        'Free tier'
      ],
      correctAnswer: 1,
      explanation: 'Reserved Instances offer significant savings (up to 72%) for workloads with predictable, consistent usage.',
      domain: 'Pricing'
    },
    {
      id: 'az-021',
      question: 'What is Azure Policy?',
      options: [
        'A legal document',
        'A service to enforce organizational standards',
        'A network routing rule',
        'An authentication method'
      ],
      correctAnswer: 1,
      explanation: 'Azure Policy evaluates resources to enforce organizational standards and assess compliance.',
      domain: 'Governance'
    },
    {
      id: 'az-022',
      question: 'Which service provides a global content delivery network?',
      options: [
        'Azure Traffic Manager',
        'Azure CDN',
        'Azure Front Door',
        'Azure DNS'
      ],
      correctAnswer: 1,
      explanation: 'Azure CDN delivers high bandwidth content globally using a distributed network of servers.',
      domain: 'Networking'
    },
    {
      id: 'az-023',
      question: 'What is the Azure Shared Responsibility Model?',
      options: [
        'Cost sharing between departments',
        'Division of security duties between Microsoft and customers',
        'Resource sharing between subscriptions',
        'Load distribution model'
      ],
      correctAnswer: 1,
      explanation: 'The shared responsibility model defines which security tasks are handled by Microsoft and which by the customer.',
      domain: 'Security'
    },
    {
      id: 'az-024',
      question: 'What is an Azure Subscription?',
      options: [
        'A newsletter signup',
        'A logical container for billing and access management',
        'A support plan',
        'A software license type'
      ],
      correctAnswer: 1,
      explanation: 'An Azure Subscription is a logical unit for organizing resources and managing billing and access controls.',
      domain: 'Management'
    },
    {
      id: 'az-025',
      question: 'Which service provides recommendations for optimizing Azure resources?',
      options: [
        'Azure Monitor',
        'Azure Advisor',
        'Azure Service Health',
        'Azure Cost Management'
      ],
      correctAnswer: 1,
      explanation: 'Azure Advisor analyzes your configurations and usage to provide personalized best practice recommendations.',
      domain: 'Management'
    }
  ],

  domains: [
    { name: 'Core Architecture', count: 2 },
    { name: 'Compute', count: 3 },
    { name: 'Storage', count: 2 },
    { name: 'Networking', count: 5 },
    { name: 'Database', count: 2 },
    { name: 'Identity', count: 1 },
    { name: 'Security', count: 2 },
    { name: 'Management', count: 5 },
    { name: 'Containers', count: 1 },
    { name: 'Pricing', count: 1 },
    { name: 'Governance', count: 1 }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AzureBasicsQuestions;
}
