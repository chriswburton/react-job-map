data "aws_ssm_parameter" "accountId" {
  name = "accountId"
}

resource "aws_lambda_permission" "get-jobs-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get-jobs.function_name}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${data.aws_ssm_parameter.accountId.value}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}

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
