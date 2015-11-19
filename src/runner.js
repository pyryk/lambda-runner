'use strict';

const withStacktrace = (errors) => 
	errors.map(e => e.stack ? `${e.message}: ${e.stack}` : JSON.stringify(e, null, 4));

const context = {
	succeed: function(...results) {
		console.log(...['SUCCESS'].concat(results));
	},
	fail: function(...results) {
		console.log(...['FAILURE'].concat(withStacktrace(results)));
	}
};

export default function createRunner() {
	return Object.assign({}, context, {}); // TODO add version, alias etc.
}