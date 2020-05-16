const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({
    region: 'us-east-2'
})

module.exports = async (functionName) => {
    try {
        const res = await lambda
            .getFunctionConfiguration({
                FunctionName: functionName
            })
            .promise()

        return {
            name: res.FunctionName,
            description: res.Description,
            timeout: res.Timeout,
            runtime: res.Runtime,
            role: {
                arn: res.Role
            },
            handler: res.Handler,
            memory: res.MemorySize,
            hash: res.CodeSha256,
            env: res.Environment ? res.Environment.Variables : {},
            arn: res.FunctionArn,
            securityGroupIds: res.VpcConfig ? res.VpcConfig.SecurityGroupIds : false,
            subnetIds: res.VpcConfig ? res.VpcConfig.SubnetIds : false
        }
    } catch (e) {
        if (e.code === 'ResourceNotFoundException') {
            return null
        }
        throw e
    }
}