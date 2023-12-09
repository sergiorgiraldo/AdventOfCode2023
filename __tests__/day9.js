
const lib = require('../solutions/lib/day9');

test("PredictValuesInFuture", () => {
	const lines = [];
	lines.push("0 3 6 9 12 15");
	lines.push("1 3 6 10 15 21");
	lines.push("10 13 16 21 30 45");
	expect(lib.getSumOfPredictedValuesFuture(lines)).toBe(114);
});

test("PredictValuesInPast", () => {
	const lines = [];
	lines.push("0 3 6 9 12 15");
	lines.push("1 3 6 10 15 21");
	lines.push("10 13 16 21 30 45");
	expect(lib.getSumOfPredictedValuesPast(lines)).toBe(2);
});
