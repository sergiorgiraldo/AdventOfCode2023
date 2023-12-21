const lib = require("../solutions/lib/day21");

test("Walk6Steps", () => {
	let lines = [];
	lines.push("...........");
	lines.push(".....###.#.");
	lines.push(".###.##..#.");
	lines.push("..#.#...#..");
	lines.push("....#.#....");
	lines.push(".##..S####.");
	lines.push(".##..#...#.");
	lines.push(".......##..");
	lines.push(".##.#.####.");
	lines.push(".##..##.##.");
	lines.push("...........");
	expect(lib.getPositionsAfterWalking(lines, 6)).toBe(16);
});

