const lib = require("../solutions/lib/day18");

test("GetLavaLagoon", () => {
	let lines = [];
	lines.push("R 6 (#70c710)");
	lines.push("D 5 (#0dc571)");
	lines.push("L 2 (#5713f0)");
	lines.push("D 2 (#d2c081)");
	lines.push("R 2 (#59c680)");
	lines.push("D 2 (#411b91)");
	lines.push("L 5 (#8ceee2)");
	lines.push("U 2 (#caa173)");
	lines.push("L 1 (#1b58a2)");
	lines.push("U 2 (#caa171)");
	lines.push("R 2 (#7807d2)");
	lines.push("U 3 (#a77fa3)");
	lines.push("L 2 (#015232)");
	lines.push("U 2 (#7a21e3)");

	expect(lib.getLavaLagoon(lines)).toBe(62);
});

test("ExpandLavaLagoon", () => {
	let lines = [];
	lines.push("R 6 (#70c710)");
	lines.push("D 5 (#0dc571)");
	lines.push("L 2 (#5713f0)");
	lines.push("D 2 (#d2c081)");
	lines.push("R 2 (#59c680)");
	lines.push("D 2 (#411b91)");
	lines.push("L 5 (#8ceee2)");
	lines.push("U 2 (#caa173)");
	lines.push("L 1 (#1b58a2)");
	lines.push("U 2 (#caa171)");
	lines.push("R 2 (#7807d2)");
	lines.push("U 3 (#a77fa3)");
	lines.push("L 2 (#015232)");
	lines.push("U 2 (#7a21e3)");

	expect(lib.getHugeLavaLagoon(lines)).toBe(952408144115);
});
