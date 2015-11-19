# lambda-runner
A mock runner for AWS Lambda functions

## Installation

Not in `npm` yet. Use `npm install -D pyryk/lambda-runner` to install runner as a `devDependency`.

## Usage

Create a runner with the following code:

### myLambdaFunctionIndex.js:

    exports.handler = function(event, context) {
        context.succeed({data: 'success'});
    }


### runner.js:

    import Runner from 'lambda-runner';
    import myLambdaFunction from './myLambdaFunctionIndex';

    // all opts are optional
    const opts = {
        name: 'MyLambdaFunction',
        memoryLimitInMB: '128',
        timeoutInSec: 3,
        invokeid: 'abc123',
        functionVersion: '$LATEST',
        invokedFunctionArn: 'arn:aws:etc:lambda:MyLambdaFunction',
        logGroupName: '/aws/lambda/MyLambdaFunction',
        logStreamName: 'exampleLogStreamName'
    };

    Runner.run(myLambdaFunction.handler, {data: 'myData'}, opts);

## License

MIT. See [LICENSE.md](LICENSE.md)
