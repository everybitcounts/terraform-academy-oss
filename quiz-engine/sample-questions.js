/**
 * Sample Question Bank — Quiz Engine Demo
 *
 * Replace this file with your own question sets.
 * Each module key maps to an array of question objects.
 *
 * Question format:
 *   {
 *     id: number,
 *     text: string,
 *     options: string[],        // "A. ...", "B. ...", etc.
 *     answer: string | string[], // "B" for single, ["A","C"] for multi-select
 *     explanation: string
 *   }
 */

const SAMPLE_QUESTIONS = {
  "cloud-basics": [
    {
      id: 1,
      text: "What is the primary benefit of cloud computing?",
      options: [
        "A. Higher upfront costs",
        "B. On-demand resource provisioning",
        "C. Reduced internet speed",
        "D. Manual hardware management"
      ],
      answer: "B",
      explanation: "Cloud computing enables on-demand provisioning of resources without managing physical hardware."
    },
    {
      id: 2,
      text: "Which of the following are characteristics of cloud computing? (Select TWO.)",
      options: [
        "A. Pay-as-you-go pricing",
        "B. Requires physical server rooms",
        "C. Elasticity and scalability",
        "D. Fixed capacity only"
      ],
      answer: ["A", "C"],
      explanation: "Pay-as-you-go pricing and elasticity/scalability are core characteristics of cloud computing."
    },
    {
      id: 3,
      text: "What does IaaS stand for?",
      options: [
        "A. Internet as a Service",
        "B. Infrastructure as a Service",
        "C. Integration as a System",
        "D. Information and Analytics Service"
      ],
      answer: "B",
      explanation: "IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet."
    },
    {
      id: 4,
      text: "Which cloud deployment model uses both on-premises and cloud resources?",
      options: [
        "A. Public cloud",
        "B. Private cloud",
        "C. Hybrid cloud",
        "D. Community cloud"
      ],
      answer: "C",
      explanation: "A hybrid cloud combines on-premises infrastructure with public cloud services for greater flexibility."
    },
    {
      id: 5,
      text: "What is the responsibility of the cloud provider in a shared responsibility model?",
      options: [
        "A. Application data encryption",
        "B. Physical infrastructure security",
        "C. User access management",
        "D. Operating system patching on VMs"
      ],
      answer: "B",
      explanation: "In the shared responsibility model, the cloud provider secures the physical infrastructure, while customers manage their applications and data."
    }
  ],

  "infrastructure-as-code": [
    {
      id: 1,
      text: "What is the main advantage of Infrastructure as Code (IaC)?",
      options: [
        "A. Manual configuration of servers",
        "B. Reproducible and version-controlled infrastructure",
        "C. Increased deployment time",
        "D. Reduced automation"
      ],
      answer: "B",
      explanation: "IaC allows infrastructure to be version-controlled and deployed consistently and repeatably."
    },
    {
      id: 2,
      text: "Which tool is commonly used for declarative infrastructure provisioning?",
      options: [
        "A. Ansible",
        "B. Terraform",
        "C. Jenkins",
        "D. Docker"
      ],
      answer: "B",
      explanation: "Terraform is a popular declarative IaC tool that provisions infrastructure across multiple cloud providers."
    },
    {
      id: 3,
      text: "What does 'terraform plan' do?",
      options: [
        "A. Deploys all resources immediately",
        "B. Shows a preview of changes without applying them",
        "C. Destroys all resources",
        "D. Initializes the working directory"
      ],
      answer: "B",
      explanation: "The 'terraform plan' command shows a preview of the changes Terraform will make, without actually applying them."
    },
    {
      id: 4,
      text: "Which file format does Terraform use for configuration?",
      options: [
        "A. YAML",
        "B. JSON only",
        "C. HCL (HashiCorp Configuration Language)",
        "D. XML"
      ],
      answer: "C",
      explanation: "Terraform uses HCL (HashiCorp Configuration Language) as its primary configuration format, though it also supports JSON."
    },
    {
      id: 5,
      text: "What does 'terraform state' track?",
      options: [
        "A. User passwords",
        "B. The mapping between configuration and real-world resources",
        "C. Network traffic logs",
        "D. Application source code"
      ],
      answer: "B",
      explanation: "Terraform state tracks the mapping between your configuration files and the actual cloud resources that have been provisioned."
    }
  ],

  "security-fundamentals": [
    {
      id: 1,
      text: "What is the principle of least privilege?",
      options: [
        "A. Granting maximum access to all users",
        "B. Giving users only the minimum permissions they need",
        "C. Removing all access controls",
        "D. Using a single admin account for everything"
      ],
      answer: "B",
      explanation: "The principle of least privilege means granting users only the minimum permissions necessary to perform their tasks."
    },
    {
      id: 2,
      text: "Which of the following improve authentication security? (Select TWO.)",
      options: [
        "A. Multi-factor authentication (MFA)",
        "B. Sharing passwords",
        "C. Strong password policies",
        "D. Using the same password everywhere"
      ],
      answer: ["A", "C"],
      explanation: "MFA and strong password policies significantly improve authentication security."
    },
    {
      id: 3,
      text: "What type of encryption protects data while it is being transmitted?",
      options: [
        "A. Encryption at rest",
        "B. Encryption in transit",
        "C. Hashing",
        "D. Tokenization"
      ],
      answer: "B",
      explanation: "Encryption in transit (e.g., TLS/SSL) protects data while it is being transmitted between systems."
    },
    {
      id: 4,
      text: "What is a VPC?",
      options: [
        "A. Virtual Private Cloud — an isolated network in the cloud",
        "B. Very Private Computer — a secure laptop",
        "C. Variable Processing Container — a compute unit",
        "D. Version Patch Control — a deployment tool"
      ],
      answer: "A",
      explanation: "A VPC (Virtual Private Cloud) is a logically isolated section of the cloud where you can launch resources in a defined virtual network."
    },
    {
      id: 5,
      text: "What does a firewall do?",
      options: [
        "A. Stores encrypted data",
        "B. Filters network traffic based on rules",
        "C. Compresses files for transfer",
        "D. Manages user passwords"
      ],
      answer: "B",
      explanation: "A firewall filters incoming and outgoing network traffic based on security rules to protect your resources."
    }
  ]
};
