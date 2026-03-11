# Install Terraform on Windows

A step by step guide to installing HashiCorp Terraform on Windows.

## Prerequisites

- Windows 10 or Windows 11
- Administrator access
- PowerShell 5.1 or later

## Method 1: Chocolatey (Recommended)

### Step 1: Install Chocolatey

Open PowerShell as Administrator:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Step 2: Install Terraform

```powershell
choco install terraform
```

### Step 3: Verify Installation

Open a new PowerShell window:

```powershell
terraform version
```

### Updating Terraform

```powershell
choco upgrade terraform
```

## Method 2: Winget

Windows Package Manager (built into Windows 11):

```powershell
winget install HashiCorp.Terraform
```

Verify:

```powershell
terraform version
```

## Method 3: Scoop

```powershell
# Install Scoop if needed
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install Terraform
scoop install terraform
```

## Method 4: Manual Installation

### Step 1: Download Terraform

1. Visit https://developer.hashicorp.com/terraform/install
2. Download the Windows AMD64 zip file
3. Or use PowerShell:

```powershell
$version = "1.9.0"
Invoke-WebRequest -Uri "https://releases.hashicorp.com/terraform/$version/terraform_${version}_windows_amd64.zip" -OutFile "terraform.zip"
```

### Step 2: Extract

```powershell
Expand-Archive -Path terraform.zip -DestinationPath C:\terraform
```

### Step 3: Add to PATH

Using PowerShell (Administrator):

```powershell
$oldPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$newPath = "$oldPath;C:\terraform"
[Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
```

Or manually:

1. Open System Properties (Win + Pause)
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under System variables, select "Path"
5. Click "Edit"
6. Click "New"
7. Add `C:\terraform`
8. Click "OK" on all dialogs

### Step 4: Verify

Open a new PowerShell window:

```powershell
terraform version
```

## Method 5: tfenv for Windows

Using tfenv-windows:

```powershell
# Clone repository
git clone https://github.com/tfutils/tfenv.git $env:USERPROFILE\.tfenv

# Add to PATH (add to your PowerShell profile)
$env:PATH = "$env:USERPROFILE\.tfenv\bin;$env:PATH"

# Install Terraform
tfenv install latest
tfenv use latest
```

## Enable Tab Completion (PowerShell)

Add to your PowerShell profile (`$PROFILE`):

```powershell
# Create profile if it does not exist
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}

# Add Terraform completion
Add-Content -Path $PROFILE -Value @'
Register-ArgumentCompleter -Native -CommandName terraform -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
    $env:COMP_LINE = $commandAst.ToString()
    $env:COMP_POINT = $cursorPosition
    terraform | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
    }
}
'@
```

Reload:

```powershell
. $PROFILE
```

## Using WSL (Windows Subsystem for Linux)

For a Linux environment on Windows:

1. Install WSL:

```powershell
wsl --install
```

2. Follow the [Linux installation guide](./terraform-install-linux.md) inside WSL

## Verify Your Setup

```powershell
mkdir $env:USERPROFILE\terraform-test
cd $env:USERPROFILE\terraform-test

@"
terraform {
  required_version = ">= 1.0.0"
}

output "hello" {
  value = "Terraform is working on Windows!"
}
"@ | Out-File -FilePath main.tf -Encoding utf8

terraform init
terraform apply -auto-approve
```

## IDE Integration

### VS Code

1. Install VS Code
2. Install the HashiCorp Terraform extension
3. Open a folder with .tf files

### JetBrains IDEs

Install the Terraform and HCL plugin from the marketplace.

## Troubleshooting

### 'terraform' is not recognized

- Restart PowerShell or Command Prompt
- Verify PATH includes Terraform directory
- Check with: `$env:PATH -split ';'`

### Permission errors

Run PowerShell as Administrator

### Antivirus blocking

Some antivirus software may flag Terraform. Add an exclusion for:
- `C:\terraform\terraform.exe` (manual install)
- `C:\ProgramData\chocolatey\bin\terraform.exe` (Chocolatey)

### SSL/TLS errors

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
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
