
const lib = require('../solutions/lib/day11');

test("GalaxyMapYoungUniverse", () => {
	let lines = [];
	lines.push("...#......");
	lines.push(".......#..");
	lines.push("#.........");
	lines.push("..........");
	lines.push("......#...");
	lines.push(".#........");
	lines.push(".........#");
	lines.push("..........");
	lines.push(".......#..");
	lines.push("#...#.....");
	expect(lib.getShortestPaths(lines, 2)).toBe(374);
});

test("GalaxyMapOldUniverse-10", () => {
	let lines = [];
	lines.push("...#......");
	lines.push(".......#..");
	lines.push("#.........");
	lines.push("..........");
	lines.push("......#...");
	lines.push(".#........");
	lines.push(".........#");
	lines.push("..........");
	lines.push(".......#..");
	lines.push("#...#.....");
	expect(lib.getShortestPaths(lines, 10)).toBe(1030);
});

test("GalaxyMapOldUniverse-100", () => {
	let lines = [];
	lines.push("...#......");
	lines.push(".......#..");
	lines.push("#.........");
	lines.push("..........");
	lines.push("......#...");
	lines.push(".#........");
	lines.push(".........#");
	lines.push("..........");
	lines.push(".......#..");
	lines.push("#...#.....");
	expect(lib.getShortestPaths(lines,100)).toBe(8410);
});
