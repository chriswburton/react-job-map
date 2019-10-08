resource "aws_api_gateway_rest_api" "api" {
  name          = "jobs-api"
  description   = "A simple API for fetching jobs for our React map"
}

resource "aws_api_gateway_resource" "resource" {
  path_part     = "jobs"
  parent_id     = "${aws_api_gateway_rest_api.api.root_resource_id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method" "options-method" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "options-200" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "${aws_api_gateway_method.options-method.http_method}"
  status_code   = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
  depends_on  = ["aws_api_gateway_method.options-method"]
}

resource "aws_api_gateway_integration" "options-integration" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "${aws_api_gateway_method.options-method.http_method}"
  type          = "MOCK"
  depends_on    = ["aws_api_gateway_method.options-method"]
}

resource "aws_api_gateway_integration_response" "options-integration-response" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "${aws_api_gateway_method.options-method.http_method}"
  status_code   = "${aws_api_gateway_method_response.options-200.status_code}"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  depends_on  = ["aws_api_gateway_method_response.options-200"]
}

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "method-response-200" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "${aws_api_gateway_method.method.http_method}"
  status_code   = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
  depends_on = ["aws_api_gateway_method.method"]
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.resource.id}"
  http_method             = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/${aws_lambda_function.get-jobs.arn}/invocations"
  depends_on              = ["aws_api_gateway_method.method", "aws_lambda_function.get-jobs"]
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  stage_name    = "Dev"
  depends_on    = ["aws_api_gateway_integration.integration"]
}
