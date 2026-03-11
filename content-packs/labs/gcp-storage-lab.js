/**
 * GCP Cloud Storage Lab Configuration
 * Open Source Lab for Terraform Academy OSS
 * 
 * Teaches GCP resource provisioning with Terraform
 * 
 * License: MIT
 */

const GCPStorageLab = {
  id: 'gcp-storage-basics',
  title: 'GCP Cloud Storage with Terraform',
  description: 'Create a Cloud Storage bucket with lifecycle rules',
  version: '1.0.0',
  difficulty: 'beginner',
  estimatedTime: 15,
  provider: 'gcp',

  objectives: [
    'Configure the Google Cloud provider',
    'Create a Cloud Storage bucket with unique naming',
    'Configure bucket location and storage class',
    'Set up lifecycle rules for cost optimization',
    'Configure access controls'
  ],

  prerequisites: [
    'Basic understanding of GCP concepts',
    'Familiarity with Terraform syntax',
    'GCP project (for deployment testing)'
  ],

  files: {
    'main.tf': {
      starter: `# GCP Cloud Storage Lab
# Your task: Create a Cloud Storage bucket with lifecycle rules

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# TODO: Create a Cloud Storage bucket
# Name must be globally unique
# Location: US
# Storage class: STANDARD

# TODO: Add lifecycle rule
# Move to NEARLINE after 30 days
# Move to COLDLINE after 90 days

# TODO: Enable versioning
`,
      solution: `# GCP Cloud Storage Lab - Solution

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "google_storage_bucket" "main" {
  name          = "terraform-academy-\${random_id.bucket_suffix.hex}"
  location      = "US"
  storage_class = "STANDARD"

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }

  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type          = "SetStorageClass"
      storage_class = "COLDLINE"
    }
  }

  labels = {
    environment = "lab"
    project     = "terraform-academy"
  }
}
`
    },
    'variables.tf': {
      starter: `# Variables for GCP Storage Lab

variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

# TODO: Add any additional variables
`,
      solution: `# Variables for GCP Storage Lab

variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Environment label"
  type        = string
  default     = "lab"
}
`
    },
    'outputs.tf': {
      starter: `# Outputs for GCP Storage Lab

# TODO: Output the bucket name

# TODO: Output the bucket URL

# TODO: Output the bucket location
`,
      solution: `# Outputs for GCP Storage Lab

output "bucket_name" {
  description = "Name of the Cloud Storage bucket"
  value       = google_storage_bucket.main.name
}

output "bucket_url" {
  description = "URL of the bucket"
  value       = google_storage_bucket.main.url
}

output "bucket_location" {
  description = "Location of the bucket"
  value       = google_storage_bucket.main.location
}

output "bucket_self_link" {
  description = "Self link of the bucket"
  value       = google_storage_bucket.main.self_link
}
`
    }
  },

  validation: {
    rules: [
      {
        type: 'resource_exists',
        resource: 'google_storage_bucket.main',
        message: 'Cloud Storage bucket must be defined'
      },
      {
        type: 'attribute_value',
        resource: 'google_storage_bucket.main',
        attribute: 'location',
        expected: 'US',
        message: 'Bucket location must be US'
      },
      {
        type: 'attribute_value',
        resource: 'google_storage_bucket.main',
        attribute: 'storage_class',
        expected: 'STANDARD',
        message: 'Storage class must be STANDARD'
      },
      {
        type: 'block_exists',
        resource: 'google_storage_bucket.main',
        block: 'lifecycle_rule',
        message: 'Lifecycle rules must be configured'
      },
      {
        type: 'block_exists',
        resource: 'google_storage_bucket.main',
        block: 'versioning',
        message: 'Versioning must be enabled'
      }
    ]
  },

  hints: [
    {
      trigger: 'missing_bucket',
      message: 'Create a google_storage_bucket resource with a unique name'
    },
    {
      trigger: 'name_conflict',
      message: 'Bucket names must be globally unique. Use random_id to generate a suffix.'
    },
    {
      trigger: 'missing_lifecycle',
      message: 'Add lifecycle_rule blocks to transition storage classes based on age'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GCPStorageLab;
}
