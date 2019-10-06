data "aws_iam_policy_document" "assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "app" {
  name = "${var.name}"

  assume_role_policy = "${data.aws_iam_policy_document.assume-role-policy.json}"
}

data "aws_iam_policy_document" "lambda-role-policy" {
  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_role_policy" "app" {
  name = "${var.name}"
  role = "${aws_iam_role.app.id}"

  policy = "${data.aws_iam_policy_document.lambda-role-policy.json}"
}
