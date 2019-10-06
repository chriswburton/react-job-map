provider "aws" {
  profile    = "default"
  region     = "${var.region}"
}

resource "aws_ssm_parameter" "accountId" {
  name        = "accountId"
  description = "AWS Account ID"
  type        = "String"
  value       = "<secret>"

  lifecycle {
    ignore_changes = ["value"]
  }
}

variable "region" {
  type    = "string"
  default = "eu-west-1"
}
