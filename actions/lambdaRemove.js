const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({
    region: 'us-east-2'
})

module.exports = async (name) => {
    const params = {
        FunctionName: name
    }
    return await lambda.deleteFunction(params).promise()
}