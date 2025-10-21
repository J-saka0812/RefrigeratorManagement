variable "cloudflare_zone_id" {
  type        = string
  description = "The Zone ID of the Cloudflare domain."
  # デフォルト値は設定しない。実行時に指定させる。
}

variable "my_global_ip" {
  type        = string
  description = "The global IP address to create an A record for."
}

variable "vsphere_password" {
  type        = string
  description = "The password for the vSphere user."
  sensitive   = true # 機密情報の取り扱い
}