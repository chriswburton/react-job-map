resource "aws_cloudwatch_log_group" "get-jobs" {
  name              = "/aws/lambda/get-jobs"
  retention_in_days = "${var.log_retention}"
}
