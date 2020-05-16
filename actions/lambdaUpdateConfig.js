const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({ region: 'us-east-2' })

module.exports = async (inputs) => {
    const functionConfigParams = {
        FunctionName: inputs.name,
        Description: inputs.description,
        Handler: inputs.handler,
        MemorySize: inputs.memory,
        Role: inputs.roleArn || inputs.autoRoleArn,
        Runtime: inputs.runtime,
        Timeout: inputs.timeout,
        Layers: inputs.layers,
        Environment: {
            Variables: inputs.env
        },
        ...(inputs.securityGroupIds
            ? {
                VpcConfig: {
                    SecurityGroupIds: inputs.securityGroupIds,
                    SubnetIds: inputs.subnetIds
                }
            }
            : {
                VpcConfig: {
                    SecurityGroupIds: [],
                    SubnetIds: []
                }
            })
    }

    const res = await lambda.updateFunctionConfiguration(functionConfigParams).promise()
    return { arn: res.FunctionArn, hash: res.CodeSha256 }
}