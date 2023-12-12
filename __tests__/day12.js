const lib = require("../solutions/lib/day12");

test("BrokenSprings", () => {
	let lines = [];
	lines.push("???.### 1,1,3");
	lines.push(".??..??...?##. 1,1,3");
	lines.push("?#?#?#?#?#?#?#? 1,3,1,6");
	lines.push("????.#...#... 4,1,1");
	lines.push("????.######..#####. 1,6,5");
	lines.push("?###???????? 3,2,1");

	expect(lib.getBrokenSprings(lines)).toBe(21);
});

test("BrokenSpringsUnfolded", () => {
	let lines = [];
	lines.push("???.### 1,1,3");
	lines.push(".??..??...?##. 1,1,3");
	lines.push("?#?#?#?#?#?#?#? 1,3,1,6");
	lines.push("????.#...#... 4,1,1");
	lines.push("????.######..#####. 1,6,5");
	lines.push("?###???????? 3,2,1");

	expect(lib.getBrokenSpringsUnfolded(lines)).toBe(525152);
});
