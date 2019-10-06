resource "aws_s3_bucket" "react-job-map" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
  policy = "${file("bucket-policy.json")}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
