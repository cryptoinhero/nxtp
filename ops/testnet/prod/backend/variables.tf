variable "region" {
  default = "us-west-1"
}

variable "cidr_block" {
  default = "172.17.0.0/16"
}

variable "az_count" {
  default = "2"
}

variable "domain" {
  description = "domain of deployment"
  default     = "backend"
}

variable "stage" {
  description = "stage of deployment"
  default     = "production"
}

variable "environment" {
  description = "env we're deploying to"
  default     = "testnet"
}

variable "full_image_name_cartographer" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/cartographer:0.2.0-beta.10"
}

variable "certificate_arn_testnet" {
  default = "arn:aws:acm:us-west-1:679752396206:certificate/0ebbf095-681a-4a0a-9dc9-fa70cb80166a"
}

variable "postgres_password" {
  type = string
}

variable "postgres_user" {
  type    = string
  default = "connext"
}

variable "dd_api_key" {
  type = string
}
