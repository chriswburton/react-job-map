variable "name" {
  type    = "string"
  default = "get-jobs"
}

variable "bucket_name" {
  type    = "string"
  default = "react-job-map"
}

variable "log_retention" {
  type    = "string"
  default = "7"
}

variable "domain_name" {
  type    = "string"
  default = "execute-api.eu-west-1.amazonaws.com"
}

variable "gateway_version" {
  type    = "string"
  default = "Live"
}

variable "stage_name" {
  type    = "string"
  default = "Dev"
}
