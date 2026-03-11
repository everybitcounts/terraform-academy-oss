# Install Terraform on Linux

A step by step guide to installing HashiCorp Terraform on Linux distributions.

## Prerequisites

- Linux distribution (Ubuntu, Debian, RHEL, CentOS, Fedora, Amazon Linux)
- Root or sudo access
- curl or wget installed

## Method 1: Package Manager (Recommended)

### Ubuntu/Debian

```bash
# Install dependencies
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

# Add HashiCorp GPG key
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

# Verify key fingerprint
gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

# Add repository
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

# Install Terraform
sudo apt-get update && sudo apt-get install terraform
```

### RHEL/CentOS/Fedora

```bash
# Install yum-config-manager
sudo yum install -y yum-utils

# Add HashiCorp repository
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo

# Install Terraform
sudo yum -y install terraform
```

### Amazon Linux 2

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo yum -y install terraform
```

### Verify Installation

```bash
terraform version
```

## Method 2: Manual Installation

Works on any Linux distribution.

### Step 1: Download Terraform

```bash
# Get latest version number
TERRAFORM_VERSION=$(curl -s https://checkpoint-api.hashicorp.com/v1/check/terraform | jq -r .current_version)

# Download for your architecture
# For x86_64 (most common)
curl -LO "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip"

# For ARM64
curl -LO "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_arm64.zip"
```

### Step 2: Extract and Install

```bash
unzip terraform_*.zip
sudo mv terraform /usr/local/bin/
sudo chmod +x /usr/local/bin/terraform
```

### Step 3: Verify

```bash
terraform version
```

## Method 3: tfenv (Version Manager)

Manage multiple Terraform versions:

```bash
# Clone tfenv
git clone --depth=1 https://github.com/tfutils/tfenv.git ~/.tfenv

# Add to PATH
echo 'export PATH="$HOME/.tfenv/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Terraform
tfenv install latest
tfenv use latest

# Verify
terraform version
```

## Method 4: asdf Version Manager

If you use asdf for other tools:

```bash
# Add Terraform plugin
asdf plugin add terraform

# Install latest version
asdf install terraform latest
asdf global terraform latest

# Verify
terraform version
```

## Enable Tab Completion

### Bash

```bash
terraform -install-autocomplete
source ~/.bashrc
```

### Zsh

```bash
terraform -install-autocomplete
source ~/.zshrc
```

## Verify Your Setup

```bash
mkdir ~/terraform-test && cd ~/terraform-test

cat > main.tf << 'EOF'
terraform {
  required_version = ">= 1.0.0"
}

output "hello" {
  value = "Terraform is working on Linux!"
}
EOF

terraform init
terraform apply -auto-approve
```

## Cloud Shell Options

Pre-installed Terraform environments:

| Cloud | Shell | Access |
|-------|-------|--------|
| AWS | CloudShell | console.aws.amazon.com |
| Azure | Cloud Shell | shell.azure.com |
| GCP | Cloud Shell | shell.cloud.google.com |

## Troubleshooting

### Command not found

```bash
# Check PATH
echo $PATH

# Add to PATH if needed
export PATH=$PATH:/usr/local/bin
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
```

### Permission denied

```bash
sudo chmod +x /usr/local/bin/terraform
```

### GPG key errors (apt)

```bash
sudo rm /usr/share/keyrings/hashicorp-archive-keyring.gpg
# Re-run the GPG key installation steps
```

### Old version installed

```bash
# Remove old version
sudo rm /usr/local/bin/terraform

# Reinstall using package manager
```

## Next Steps

Now that Terraform is installed:

1. **Learn the basics**: Try our [Terraform Fundamentals](../terraform-fundamentals/) quiz
2. **Hands on practice**: Complete the [AWS VPC Lab](../labs/aws-vpc-lab.js)
3. **Get certified**: Prepare for HashiCorp Terraform Associate at [Terraform Academy](https://terraformacademy.com)

## Official Resources

- HashiCorp Install Guide: https://developer.hashicorp.com/terraform/install
- Terraform Documentation: https://developer.hashicorp.com/terraform/docs
- Terraform Tutorials: https://developer.hashicorp.com/terraform/tutorials

---

**Ready for certification prep?** Visit [terraformacademy.com](https://terraformacademy.com) for guided quizzes or [terraformacademy.app](https://terraformacademy.app) for the full learning experience with AI coaching.
