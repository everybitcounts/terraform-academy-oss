# Getting Started Guides

Installation and setup guides for Terraform and related tools.

## Terraform Installation

Platform specific installation guides:

| Platform | Guide | Methods |
|----------|-------|---------|
| macOS | [terraform-install-macos.md](./terraform-install-macos.md) | Homebrew, manual, tfenv |
| Linux | [terraform-install-linux.md](./terraform-install-linux.md) | apt, yum, manual, tfenv, asdf |
| Windows | [terraform-install-windows.md](./terraform-install-windows.md) | Chocolatey, Winget, Scoop, manual |

## Quick Start

### macOS

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
terraform version
```

### Linux (Debian/Ubuntu)

```bash
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

### Windows

```powershell
choco install terraform
```

## Next Steps

After installing Terraform:

- Try the [Terraform Fundamentals Quiz](../terraform-fundamentals/)
- Practice with [lab exercises](../labs/)
- Learn [AI tooling for infrastructure](../ai-tooling/)

## Contributing

These guides are part of the Terraform Academy open source content packs. Contributions welcome via pull request.

---

**Master Terraform.** Get certified at [terraformacademy.app](https://terraformacademy.app).
