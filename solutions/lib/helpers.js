const gcd = (x, y) => (!y ? x : gcd(y, x % y)); // recursive, get remainder until it is 0

const lcm = (x, y) => (x * y) / gcd(x, y);

function memoize(func) {
	let cache = new Map();
    
	return function (...args) {
		var key = args.join("~");

		if (cache.has(key)) {
			return cache.get(key);
		} else {
			const result = func(...args);

			cache.set(key, result);
			
            return result;
		}
	};
}

module.exports = { gcd, lcm, memoize };