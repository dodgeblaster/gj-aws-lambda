const AWS = require('aws-sdk')
const { readFile } = require('fs-extra')
const lambda = new AWS.Lambda({ region: 'us-east-2' })

module.exports = async ({ name, handler, role, zipLocation }) => {
    try {
        const params = {
            Code: {
                ZipFile: await readFile(zipLocation)
            },
            Description: "",
            Environment: {
                Variables: {}
            },
            FunctionName: name,
            Handler: handler,
            MemorySize: 256,
            Publish: true,
            Role: role,
            Runtime: "nodejs12.x",
            Timeout: 15
        }

        await lambda.createFunction(params).promise()
        return {
            state: 'SUCCESS',
            data: {}
        }
    } catch (e) {
        throw new Error(e)
    }
}