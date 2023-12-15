const memoize = (func) => {
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
};

module.exports = { memoize };
