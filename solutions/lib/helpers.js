const gcd = (x, y) => (!y ? x : gcd(y, x % y)); // recursive, get remainder until it is 0

const lcm = (x, y) => (x * y) / gcd(x, y);

function memoize(func) {
	let stored = new Map();
    
	return function () {
		var kwargs = [];
		for (var i = 0; i < arguments.length; i++) {
			kwargs[i] = arguments[i];
		}

		var current = JSON.stringify(kwargs);

		if (stored.has(current)) {
			return stored.get(current);
		} else {
			const result = func.apply(void 0, kwargs);

			stored.set(current, result);
			
            return result;
		}
	};
}

module.exports = { gcd, lcm, memoize };
