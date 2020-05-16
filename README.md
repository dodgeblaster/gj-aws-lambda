# gj-aws-lambda

## Installation
In order to add this package to your service, run the following command:
```
npm i gj-aws-lambda
```

## Usage

```js
const lambda = require('gj-aws-lambda')

const main = async main() => {
    await lambda.create({
        srcLocation: 'path', // path to location 
        zipLocation: 'path', // path to location 
        name: 'my-function', // name of function 
        handler: 'src/index.handler', // file and method inside zip
        role: 'arn:something:something' // iam role arn 
    })

    /*
    return {
        status: 'CREATED' | 'UPDATED',
        name: 'my-function'
    }
    */

    await lambda.updateCode({
        srcLocation: 'path', // path to location 
        zipLocation: 'path', // path to location 
        name: 'my-function', // name of function 
    })
    /*
    return {
        status: 'UPDATED',
        data: {}
    }
    */

    await lambda.updateConfig({
        // not implemented yet
    })
    /*
    return {
        status: 'UPDATED',
        data: {}
    }
    */

    await lambda.remove('my-function') 
    /*
    return {
        status: 'UPDATED',
        data: {}
    }
    */
}


module.exports = main