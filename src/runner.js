import assign from 'object-assign';

const withStacktrace = (errors) => 
	errors.map(e => e.stack ? `${e.message}: ${e.stack}` : JSON.stringify(e, null, 4));

function run(handler, event, opts = {}) {
	
	const defaults = {
		name: 'MockFunctionName',
		memoryLimitInMB: '128',
		timeoutInSec: 3,
		invokeid: `${Date.now()}`,
		functionVersion: '$LATEST',
		invokedFunctionArn: null,
		logGroupName: null,
		logStreamName: 'mockLogStreamName'
	};

	opts = assign({}, defaults, opts);

	if (!invokedFunctionArn) {
		invokedFunctionArn = `arn:mock:lambda:abc:function:${name}`;
	}

	if (!logGroupName) {
		logGroupName = `/aws/lambda/${name}`;
	}

	const start = Date.now();
	function getRemainingTimeInMillis() {
		return start + timeoutInSec * 1000 - Date.now();
	}


	const context = {
		succeed: function(...results) {
			console.log(...['SUCCESS'].concat(results));
		},
		fail: function(...results) {
			console.log(...['FAILURE'].concat(withStacktrace(results)));
		},
		done: function(...results) {
			console.log(...['DONE'].concat(results));
		},
		name,
		memoryLimitInMB,
		timeoutInSec,
		invokeid,
		functionVersion,
		invokedFunctionArn,
		getRemainingTimeInMillis
	};

	handler(event, context);
}

module.exports = {
	run
};
