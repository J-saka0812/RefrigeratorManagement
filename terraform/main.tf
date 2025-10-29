# 1. 基本設定
# -------------------------------------------------
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # チルダを使うのが一般的
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

# 2. プロバイダー設定
# -------------------------------------------------
provider "aws" {
  region = "ap-northeast-1"
}



provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# 3. 独立したリソースの定義
# -------------------------------------------------

# AWS ECRリポジトリ
resource "aws_ecr_repository" "app_repo" {
  name = "refrigerator-app"
}

# Cloudflare DNSレコード (Aレコード)
resource "cloudflare_record" "app" {
  zone_id = var.cloudflare_zone_id # 変数で渡すのが安全
  name    = "app"                  # app.your-domain.com のようになります
  value   = var.my_global_ip       # 変数で渡す
  type    = "A"
  proxied = true
}

# 4. VMware VMの定義
# -------------------------------------------------



  disk {
    label = "disk0"
    size  = 30
  }

  clone {
    template_uuid = data.vsphere_virtual_machine.template.id
  }
}

  # 5. アウトプット
# -------------------------------------------------
output "ecr_repository_url" {
  description = "The URL of the ECR repository"
  value       = aws_ecr_repository.app_repo.repository_url
}

output "vm_ip_address" {
  description = "The IP address of the vSphere VM"
  value       = vsphere_virtual_machine.server.default_ip_address
}
