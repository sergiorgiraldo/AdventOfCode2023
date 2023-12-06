
const lib = require('../solutions/lib/day6');

test("LetsWinTheRace", () => {
	const lines=[];
	lines.push("Time:      7  15   30");
	lines.push("Distance:  9  40  200");
	expect(lib.LetsWinTheRace(lines)).toBe(288);
});

test("LetsWinTheRace_Kerning", () => {
	const lines=[];
	lines.push("Time:      7  15   30");
	lines.push("Distance:  9  40  200");
	expect(lib.LetsWinTheRace_Kerning(lines)).toBe(71503);
});
