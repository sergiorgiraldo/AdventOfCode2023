
const lib = require('../solutions/lib/day7');

test("getTotalWinnings", () => {
	const lines= [];
	lines.push("32T3K 765");
	lines.push("T55J5 684");
	lines.push("KK677 28");
	lines.push("KTJJT 220");
	lines.push("QQQJA 483");
	expect(lib.getTotalWinnings(lines)).toBe(6440);
});

test("getTotalWinningsWithJoker", () => {
	const lines= [];
	lines.push("32T3K 765");
	lines.push("T55J5 684");
	lines.push("KK677 28");
	lines.push("KTJJT 220");
	lines.push("QQQJA 483");
	expect(lib.getTotalWinningsWithJoker(lines)).toBe(5905);
});