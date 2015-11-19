'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createRunner;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var withStacktrace = function withStacktrace(errors) {
	return errors.map(function (e) {
		return e.stack ? e.message + ': ' + e.stack : JSON.stringify(e, null, 4);
	});
};

function createRunner(_ref) {
	var _ref$name = _ref.name;
	var name = _ref$name === undefined ? 'MockFunctionName' : _ref$name;
	var _ref$memoryLimitInMB = _ref.memoryLimitInMB;
	var memoryLimitInMB = _ref$memoryLimitInMB === undefined ? '128' : _ref$memoryLimitInMB;
	var _ref$timeoutInSec = _ref.timeoutInSec;
	var timeoutInSec = _ref$timeoutInSec === undefined ? 3 : _ref$timeoutInSec;
	var _ref$invokeid = _ref.invokeid;
	var invokeid = _ref$invokeid === undefined ? '' + Date.now() : _ref$invokeid;
	var _ref$functionVersion = _ref.functionVersion;
	var functionVersion = _ref$functionVersion === undefined ? '$LATEST' : _ref$functionVersion;
	var _ref$invokedFunctionA = _ref.invokedFunctionArn;
	var invokedFunctionArn = _ref$invokedFunctionA === undefined ? null : _ref$invokedFunctionA;
	var _ref$logGroupName = _ref.logGroupName;
	var logGroupName = _ref$logGroupName === undefined ? null : _ref$logGroupName;
	var _ref$logStreamName = _ref.logStreamName;
	var logStreamName = _ref$logStreamName === undefined ? 'mockLogStreamName' : _ref$logStreamName;

	if (!invokedFunctionArn) {
		invokedFunctionArn = 'arn:mock:lambda:abc:function:' + name;
	}

	if (logGroupName) {
		logGroupName = '/aws/lambda/' + name;
	}

	var start = Date.now();
	function getRemainingTimeInMillis() {
		return start + timeoutInSec * 1000 - Date.now();
	}

	return {
		succeed: function succeed() {
			var _console;

			for (var _len = arguments.length, results = Array(_len), _key = 0; _key < _len; _key++) {
				results[_key] = arguments[_key];
			}

			(_console = console).log.apply(_console, _toConsumableArray(['SUCCESS'].concat(results)));
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

			(_console3 = console).log.apply(_console3, _toConsumableArray(['DONE'].concat(results)));
		},
		name: name,
		memoryLimitInMB: memoryLimitInMB,
		timeoutInSec: timeoutInSec,
		invokeid: invokeid,
		functionVersion: functionVersion,
		invokedFunctionArn: invokedFunctionArn,
		getRemainingTimeInMillis: getRemainingTimeInMillis
	};
}