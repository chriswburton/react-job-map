resource "aws_lambda_function" "get-jobs" {
  function_name = "${var.name}"
  handler       = "functions.getJobs"
  description   = "Function for retriving jobs JSON"
  memory_size   = "192"
  role          = "${aws_iam_role.app.arn}"
  runtime       = "nodejs10.x"
  filename      = "../lambda/bundle.zip"
  timeout       = "60"
}
