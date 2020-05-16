const createLambda = require('./actions/lambdaCreate')
const removeLambda = require('./actions/lambdaRemove')
const getLambda = require('./actions/lambdaGet')
const updateCode = require('./actions/lambdaUpdateCode')
const updateConfig = require('./actions/lambdaUpdateConfig')
const zip = require('./actions/projectZip')
const retry = require('async-retry')

module.exports = {
    create: async ({ srcLocation, zipLocation, name, handler, role }) => {
        await zip({
            location: srcLocation,
            target: zipLocation
        })

        const existingLambda = await getLambda(name)

        if (!existingLambda) {
            await retry(async bail => {
                await createLambda({
                    srcLocation,
                    zipLocation,
                    name,
                    handler,
                    role
                })
            }, {
                retries: 10
            })

            return {
                status: 'CREATED',
                data: name
            }
        }

        await updateCode({
            name,
            src: zipLocation
        })

        return {
            status: 'UPDATED',
            data: name
        }
    },


    updateCode: async ({ name, srcLocation, zipLocation }) => {
        if (!name) {
            throw new Error('Update Lambda Code requires a name')
        }

        if (!srcLocation) {
            throw new Error('Update Lambda Code requires a srcLocation')
        }

        if (!zipLocation) {
            throw new Error('Update Lambda Code requires a zipLocation')
        }

        await zip({
            location: srcLocation,
            target: zipLocation
        })

        await updateCode({
            name,
            src: zipLocation
        })

        return {
            status: 'UPDATED',
            data: {}
        }
    },

    updateConfig: async (config) => {
        await updateConfig(config)
        return {
            status: 'UPDATED',
            data: {}
        }
    },

    remove: async name => {
        await removeLambda(name)
        return {
            status: 'REMOVED',
            data: {}
        }
    }
}