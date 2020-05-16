var params = {
    Code: {
        S3Bucket: "my-bucket-1xpuxmplzrlbh",
        S3Key: "function.zip"
    },
    Description: "Process image objects from Amazon S3.",
    Environment: {
        Variables: {
            "BUCKET": "my-bucket-1xpuxmplzrlbh",
            "PREFIX": "inbound"
        }
    },
    FunctionName: "my-function",
    Handler: "index.handler",
    KMSKeyArn: "arn:aws:kms:us-west-2:123456789012:key/b0844d6c-xmpl-4463-97a4-d49f50839966",
    MemorySize: 256,
    Publish: true,
    Role: "arn:aws:iam::123456789012:role/lambda-role",
    Runtime: "nodejs12.x",
    Tags: {
        "DEPARTMENT": "Assets"
    },
    Timeout: 15,
    TracingConfig: {
        Mode: "Active"
    }
};

