/**
 * Azure Resource Group Lab Configuration
 * Open Source Lab for Terraform Academy OSS
 * 
 * Teaches basic Azure resource provisioning with Terraform
 * 
 * License: Apache-2.0
 */

const AzureResourceLab = {
  id: 'azure-resource-basics',
  title: 'Azure Resources with Terraform',
  description: 'Create a Resource Group and Storage Account in Azure',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 15,
  provider: 'azure',

  objectives: [
    'Configure the Azure provider',
    'Create a Resource Group',
    'Create a Storage Account with proper naming',
    'Configure storage account settings',
    'Output resource information'
  ],

  prerequisites: [
    'Basic understanding of Azure concepts',
    'Familiarity with Terraform syntax',
    'Azure subscription (for deployment testing)'
  ],

  files: {
    'main.tf': {
      starter: `# Azure Resource Lab
# Your task: Create a Resource Group and Storage Account

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# TODO: Create a Resource Group
# Name: terraform-academy-rg
# Location: East US

# TODO: Create a Storage Account
# Name must be globally unique (use random suffix)
# Account tier: Standard
# Replication: LRS
`,
      solution: `# Azure Resource Lab - Solution

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "random_string" "storage_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "azurerm_resource_group" "main" {
  name     = "terraform-academy-rg"
  location = var.location

  tags = {
    Environment = "lab"
    Project     = "terraform-academy"
  }
}

resource "azurerm_storage_account" "main" {
  name                     = "tfacademy\${random_string.storage_suffix.result}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    Environment = "lab"
    Project     = "terraform-academy"
  }
}
`
    },
    'variables.tf': {
      starter: `# Variables for Azure Resource Lab

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "eastus"
}

# TODO: Add any additional variables
`,
      solution: `# Variables for Azure Resource Lab

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "eastus"
}

variable "environment" {
  description = "Environment name for tagging"
  type        = string
  default     = "lab"
}
`
    },
    'outputs.tf': {
      starter: `# Outputs for Azure Resource Lab

# TODO: Output the Resource Group name

# TODO: Output the Storage Account name

# TODO: Output the Storage Account primary endpoint
`,
      solution: `# Outputs for Azure Resource Lab

output "resource_group_name" {
  description = "Name of the Resource Group"
  value       = azurerm_resource_group.main.name
}

output "storage_account_name" {
  description = "Name of the Storage Account"
  value       = azurerm_storage_account.main.name
}

output "storage_account_primary_endpoint" {
  description = "Primary blob endpoint"
  value       = azurerm_storage_account.main.primary_blob_endpoint
}
`
    }
  },

  validation: {
    rules: [
      {
        type: 'resource_exists',
        resource: 'azurerm_resource_group.main',
        message: 'Resource Group must be defined'
      },
      {
        type: 'resource_exists',
        resource: 'azurerm_storage_account.main',
        message: 'Storage Account must be defined'
      },
      {
        type: 'attribute_value',
        resource: 'azurerm_storage_account.main',
        attribute: 'account_tier',
        expected: 'Standard',
        message: 'Storage Account tier must be Standard'
      },
      {
        type: 'attribute_value',
        resource: 'azurerm_storage_account.main',
        attribute: 'account_replication_type',
        expected: 'LRS',
        message: 'Storage Account replication must be LRS'
      }
    ]
  },

  hints: [
    {
      trigger: 'missing_rg',
      message: 'Start by creating an azurerm_resource_group resource'
    },
    {
      trigger: 'storage_name_error',
      message: 'Storage account names must be globally unique. Consider using the random provider for a suffix.'
    },
    {
      trigger: 'missing_reference',
      message: 'Reference the resource group using azurerm_resource_group.main.name'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AzureResourceLab;
}
