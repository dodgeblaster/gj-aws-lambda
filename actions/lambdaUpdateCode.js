const AWS = require('aws-sdk')
const { readFile } = require('fs-extra')
const lambda = new AWS.Lambda({ region: 'us-east-2' })

module.exports = async ({ name, src }) => {
    const functionCodeParams = {
        FunctionName: name,
        Publish: true
    }

    functionCodeParams.ZipFile = await readFile(src)
    const res = await lambda.updateFunctionCode(functionCodeParams).promise()

    return res.FunctionArn
}