'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var printableResults = function printableResults(results) {
	return results.map(function (res) {
		return JSON.stringify(res, null, 4);
	});
};

var withStacktrace = function withStacktrace(errors) {
	return errors.map(function (e) {
		return e.stack ? e.message + ': ' + e.stack : JSON.stringify(e, null, 4);
	});
};

function run(handler, event) {
	var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	var defaults = {
		name: 'MockFunctionName',
		memoryLimitInMB: '128',
		timeoutInSec: 3,
		invokeid: '' + Date.now(),
		functionVersion: '$LATEST',
		invokedFunctionArn: null,
		logGroupName: null,
		logStreamName: 'mockLogStreamName'
	};

	opts = (0, _objectAssign2.default)({}, defaults, opts);

	if (!opts.invokedFunctionArn) {
		opts.invokedFunctionArn = 'arn:mock:lambda:abc:function:' + name;
	}

	if (!opts.logGroupName) {
		opts.logGroupName = '/aws/lambda/' + name;
	}

	var timeoutInSec = opts.timeoutInSec;
	var start = Date.now();
	function getRemainingTimeInMillis() {
		return start + timeoutInSec * 1000 - Date.now();
	}

	var context = (0, _objectAssign2.default)({
		succeed: function succeed() {
			var _console;

			for (var _len = arguments.length, results = Array(_len), _key = 0; _key < _len; _key++) {
				results[_key] = arguments[_key];
			}

			(_console = console).log.apply(_console, _toConsumableArray(['SUCCESS'].concat(printableResults(results))));
		},
		fail: function fail() {
			var _console2;

			for (var _len2 = arguments.length, results = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				results[_key2] = arguments[_key2];
			}

			(_console2 = console).log.apply(_console2, _toConsumableArray(['FAILURE'].concat(withStacktrace(results))));
		},
		done: function done() {
			var _console3;

			for (var _len3 = arguments.length, results = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				results[_key3] = arguments[_key3];
			}

			(_console3 = console).log.apply(_console3, _toConsumableArray(['DONE'].concat(printableResults(results))));
		}
	}, opts);

	// timeoutInSec is not available in Lambda and only used in getRemainingTimeInMillis
	delete context.timeoutInSec;

	handler(event, context);
}

module.exports = {
	run: run
};