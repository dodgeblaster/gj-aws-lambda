const iam = require('gj-aws-iam')
const lambda = require('../index')
const getLambda = require('../actions/lambdaGet')
const ACCOUNT_ID = '251256923172'

describe('createLambda', () => {
    test('will create if lambda does not exist', async (done) => {
        const roleName = 'TEST_ROLE'
        const lambdaName = 'TEST_LAMBDA'

        await iam.createRoleForLambda({
            state: '',
            name: roleName
        })

        const resultOfCreate = await lambda.create({
            srcLocation: __dirname + '/example',
            zipLocation: __dirname + "/zip/code.zip",
            name: lambdaName,
            handler: "index.handler",
            role: `arn:aws:iam::${ACCOUNT_ID}:role/` + roleName,
        })
        expect(resultOfCreate.status).toBe('CREATED')

        const result = await getLambda(lambdaName)
        expect(result.name).toBe(lambdaName)
        expect(result.handler).toBe("index.handler")
        done()
    }, 30000)

    test('will update code if lambda already exists', async (done) => {
        const roleName = 'TEST_ROLE'
        const lambdaName = 'TEST_LAMBDA'

        const resultOfCreate = await lambda.create({
            srcLocation: __dirname + '/example',
            zipLocation: __dirname + "/zip/code.zip",
            name: lambdaName,
            handler: "index.handler",
            role: `arn:aws:iam::${ACCOUNT_ID}:role/` + roleName,
        })
        expect(resultOfCreate.status).toBe('UPDATED')

        const result = await getLambda(lambdaName)
        expect(result.name).toBe(lambdaName)
        expect(result.handler).toBe("index.handler")

        await lambda.remove(lambdaName)
        await iam.removeRole(roleName)
        done()
    }, 30000)
})